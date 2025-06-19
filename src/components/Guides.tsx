import Link from "next/link";

export default function Guides() {
  const guides = [
    {
      title: "MDX Basics",
      description:
        "Learn how to write content with markdown and JSX components.",
      href: "/mdx-demo",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Interactive Components",
      description: "See how React components work inside markdown content.",
      href: "/interactive",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Code Examples",
      description:
        "Explore syntax-highlighted code blocks with copy functionality.",
      href: "/code-demo",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="my-12 not-prose">
      <div className="mx-auto max-w-6xl">
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <div key={guide.href} className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-50 to-purple-50 opacity-25 group-hover:opacity-100 blur rounded-xl transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex flex-col space-y-6 bg-white p-6 rounded-xl ring-1 ring-gray-900/5 leading-none">
                <div className="flex items-center space-x-4">
                  <div className="flex justify-center items-center bg-blue-50 p-2 rounded-lg w-12 h-12">
                    <div className="text-blue-600">{guide.icon}</div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-slate-800">{guide.title}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-6">
                  {guide.description}
                </p>
                <Link
                  href={guide.href}
                  className="font-medium text-blue-600 text-sm hover:text-blue-700"
                >
                  Read guide →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
