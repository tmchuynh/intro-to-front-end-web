import { visit } from "unist-util-visit";

/**
 * Remark plugin to automatically add collapse annotations to code blocks
 * based on special comments or function detection
 */
export function remarkAutoCollapse() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (!node.lang || !node.value) return;

      const lines = node.value.split("\n");
      const collapseRanges = [];

      // Look for special collapse markers and collect ranges while filtering lines
      let inCollapseSection = false;
      let sectionStart = null;
      const filteredLines = [];
      const originalToFilteredLineMap = new Map();
      let filteredLineNum = 1;

      lines.forEach((line, index) => {
        const originalLineNum = index + 1;
        const isCollapseStart =
          line.includes("// COLLAPSE_START") ||
          line.includes("/* COLLAPSE_START */");
        const isCollapseEnd =
          line.includes("// COLLAPSE_END") ||
          line.includes("/* COLLAPSE_END */");

        if (isCollapseStart) {
          inCollapseSection = true;
          sectionStart = filteredLineNum;
          // Don't include this line in filtered output
        } else if (isCollapseEnd) {
          if (inCollapseSection && sectionStart) {
            collapseRanges.push(`${sectionStart}-${filteredLineNum - 1}`);
            inCollapseSection = false;
            sectionStart = null;
          }
          // Don't include this line in filtered output
        } else {
          // Include this line in filtered output
          filteredLines.push(line);
          originalToFilteredLineMap.set(originalLineNum, filteredLineNum);
          filteredLineNum++;
        }
      });

      // Update the node value with filtered lines (removing collapse markers)
      if (filteredLines.length !== lines.length) {
        node.value = filteredLines.join("\n");
      }

      // Auto-detect import blocks (for JavaScript/TypeScript)
      if (
        ["javascript", "typescript", "js", "ts", "jsx", "tsx"].includes(
          node.lang
        )
      ) {
        // Use filtered lines for import detection
        const linesToCheck = filteredLines.length > 0 ? filteredLines : lines;
        let importStart = null;
        let importEnd = null;

        for (let i = 0; i < linesToCheck.length; i++) {
          const line = linesToCheck[i].trim();

          if (
            line.startsWith("import ") ||
            (line.startsWith("const ") && line.includes("require("))
          ) {
            if (importStart === null) importStart = i + 1;
            importEnd = i + 1;
          } else if (line && importStart !== null) {
            // Non-empty line that's not an import, end the import block
            if (importEnd - importStart >= 2) {
              // Only collapse if 3+ lines
              collapseRanges.push(`${importStart}-${importEnd}`);
            }
            break;
          }
        }
      }

      // Add collapse annotation to the node's meta
      if (collapseRanges.length > 0) {
        const existingMeta = node.meta || "";
        const collapseAnnotation = `collapse={${collapseRanges.join(", ")}}`;
        node.meta = existingMeta
          ? `${existingMeta} ${collapseAnnotation}`
          : collapseAnnotation;
      }
    });
  };
}

/**
 * Enhanced version that detects functions automatically
 */
export function remarkAutoCollapseFunctions() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (!node.lang || !node.value) return;

      const lines = node.value.split("\n");
      const collapseRanges = [];

      if (
        ["javascript", "typescript", "js", "ts", "jsx", "tsx"].includes(
          node.lang
        )
      ) {
        let currentFunction = null;

        lines.forEach((line, index) => {
          const lineNum = index + 1;
          const trimmedLine = line.trim();

          // Detect function declarations and React components
          if (
            trimmedLine.match(
              /^(function\s+\w+|const\s+\w+\s*=\s*\([^)]*\)\s*=>|async\s+function\s+\w+|export\s+function\s+\w+|export\s+const\s+\w+\s*=|function\s+[A-Z]\w*|const\s+[A-Z]\w*\s*=|export\s+default\s+function)/
            )
          ) {
            // Check if this function/component should be collapsed (mark with @collapse)
            if (index > 0 && lines[index - 1].includes("@collapse")) {
              currentFunction = { start: lineNum, braceCount: 0 };
            }
          }

          if (currentFunction) {
            // Count braces to find function end
            for (const char of line) {
              if (char === "{") currentFunction.braceCount++;
              if (char === "}") currentFunction.braceCount--;
            }

            // Function ended
            if (currentFunction.braceCount === 0 && line.includes("}")) {
              collapseRanges.push(`${currentFunction.start}-${lineNum}`);
              currentFunction = null;
            }
          }
        });
      }

      // Add collapse annotation
      if (collapseRanges.length > 0) {
        const existingMeta = node.meta || "";
        const collapseAnnotation = `collapse={${collapseRanges.join(", ")}}`;
        node.meta = existingMeta
          ? `${existingMeta} ${collapseAnnotation}`
          : collapseAnnotation;
      }
    });
  };
}

/**
 * Version that auto-collapses components based on naming patterns
 */
export function remarkAutoCollapseComponents() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (!node.lang || !node.value) return;

      const lines = node.value.split("\n");
      const collapseRanges = [];

      if (
        ["javascript", "typescript", "js", "ts", "jsx", "tsx"].includes(
          node.lang
        )
      ) {
        let currentFunction = null;

        lines.forEach((line, index) => {
          const lineNum = index + 1;
          const trimmedLine = line.trim();

          // Detect function declarations and React components
          const functionMatch = trimmedLine.match(
            /^(function\s+(\w+)|const\s+(\w+)\s*=\s*\([^)]*\)\s*=>|async\s+function\s+(\w+)|export\s+function\s+(\w+)|export\s+const\s+(\w+)\s*=|export\s+default\s+function\s+(\w+))/
          );

          if (functionMatch) {
            // Extract function/component name
            const name =
              functionMatch[2] ||
              functionMatch[3] ||
              functionMatch[4] ||
              functionMatch[5] ||
              functionMatch[6] ||
              functionMatch[7];

            // Auto-collapse if:
            // 1. Has @collapse comment
            // 2. Starts with capital letter (React component)
            // 3. Contains certain keywords
            const shouldCollapse =
              (index > 0 && lines[index - 1].includes("@collapse")) ||
              (name && name[0] === name[0].toUpperCase()) || // Capitalized (React component)
              (name &&
                (name.toLowerCase().includes("helper") ||
                  name.toLowerCase().includes("util") ||
                  name.toLowerCase().includes("component") ||
                  name.toLowerCase().includes("widget")));

            if (shouldCollapse) {
              currentFunction = { start: lineNum, braceCount: 0 };
            }
          }

          if (currentFunction) {
            // Count braces to find function end
            for (const char of line) {
              if (char === "{") currentFunction.braceCount++;
              if (char === "}") currentFunction.braceCount--;
            }

            // Function ended
            if (currentFunction.braceCount === 0 && line.includes("}")) {
              collapseRanges.push(`${currentFunction.start}-${lineNum}`);
              currentFunction = null;
            }
          }
        });
      }

      // Add collapse annotation
      if (collapseRanges.length > 0) {
        const existingMeta = node.meta || "";
        const collapseAnnotation = `collapse={${collapseRanges.join(", ")}}`;
        node.meta = existingMeta
          ? `${existingMeta} ${collapseAnnotation}`
          : collapseAnnotation;
      }
    });
  };
}
