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

      // Look for special collapse markers
      let inCollapseSection = false;
      let sectionStart = null;

      lines.forEach((line, index) => {
        const lineNum = index + 1;

        // Check for collapse markers
        if (
          line.includes("// COLLAPSE_START") ||
          line.includes("/* COLLAPSE_START */")
        ) {
          inCollapseSection = true;
          sectionStart = lineNum;
        } else if (
          line.includes("// COLLAPSE_END") ||
          line.includes("/* COLLAPSE_END */")
        ) {
          if (inCollapseSection && sectionStart) {
            collapseRanges.push(`${sectionStart}-${lineNum}`);
            inCollapseSection = false;
            sectionStart = null;
          }
        }
      });

      // Auto-detect import blocks (for JavaScript/TypeScript)
      if (
        ["javascript", "typescript", "js", "ts", "jsx", "tsx"].includes(
          node.lang
        )
      ) {
        let importStart = null;
        let importEnd = null;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();

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
        let braceCount = 0;

        lines.forEach((line, index) => {
          const lineNum = index + 1;
          const trimmedLine = line.trim();

          // Detect function declarations
          if (
            trimmedLine.match(
              /^(function\s+\w+|const\s+\w+\s*=\s*\([^)]*\)\s*=>|async\s+function\s+\w+)/
            )
          ) {
            // Check if this function should be collapsed (mark with // @collapse)
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
