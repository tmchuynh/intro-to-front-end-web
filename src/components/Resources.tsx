import Link from "next/link";

export default function Resources() {
  const resources = [
    {
      title: "Next.js Documentation",
      description: "Learn about the React framework for production.",
      href: "https://nextjs.org/docs",
      external: true,
    },
    {
      title: "MDX Documentation",
      description: "Markdown for the component era.",
      href: "https://mdxjs.com",
      external: true,
    },
    {
      title: "Tailwind CSS",
      description: "A utility-first CSS framework for rapid UI development.",
      href: "https://tailwindcss.com",
      external: true,
    },
    {
      title: "About This Project",
      description: "Learn more about how this demo was built.",
      href: "/about",
      external: false,
    },
  ];

  return (
    <div className="my-12 not-prose">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 font-bold text-2xl text-gray-900">Resources</h2>
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
          {resources.map((resource) => (
            <div key={resource.href} className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-50 to-blue-50 opacity-25 group-hover:opacity-100 blur rounded-xl transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-6 rounded-xl ring-1 ring-gray-900/5">
                <div>
                  <span className="inline-flex items-center space-x-1">
                    <h3 className="font-medium text-gray-900 text-lg">
                      {resource.external ? (
                        <a
                          href={resource.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors"
                        >
                          {resource.title}
                        </a>
                      ) : (
                        <Link
                          href={resource.href}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {resource.title}
                        </Link>
                      )}
                    </h3>
                    {resource.external && (
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  {resource.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
