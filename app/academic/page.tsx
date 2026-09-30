import type { Metadata } from "next";
import { academic } from "@/lib/academic";
import AcademicSidebar from "./AcademicSidebar";
import PublicationCard from "./PublicationCard";
import { renderInline } from "./inline";

export const metadata: Metadata = {
  title: "Academic",
  description: "Pecky's academic portfolio: publications, news, and education.",
};

/** 区块标题，锚点 id 供导航跳转，scroll-mt 防止 sticky 导航遮挡 */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-10">
      <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function AcademicPage() {
  const { profile, about, publications, education } = academic;

  return (
    <div lang="en">
      {/* 移动端锚点导航（桌面端锚点在 Navbar 中段） */}
      <nav className="flex gap-2 overflow-x-auto pb-2 lg:hidden" aria-label="Section navigation">
        {[
          ["#about", "About"],
          ["#publications", "Publications"],
          ["#education", "Education"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="lg:flex lg:gap-12">
        <aside className="lg:w-64 shrink-0">
          <div className="lg:sticky lg:top-20">
            <AcademicSidebar profile={profile} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <Section id="about" title="About Me">
              <div className="space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {about.map((paragraph, i) => (
                  <p key={i}>{renderInline(paragraph)}</p>
                ))}
              </div>
            </Section>

            {publications.length > 0 && (
              <Section id="publications" title="Publications">
                <div className="stagger space-y-8">
                  {publications.map((pub) => (
                    <PublicationCard key={pub.title} pub={pub} />
                  ))}
                </div>
              </Section>
            )}

            {education.length > 0 && (
              <Section id="education" title="Education">
                <ul className="space-y-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {education.map((item) => (
                    <li key={item.school}>
                      {item.schoolHref ? (
                        <a
                          href={item.schoolHref}
                          target={item.schoolHref.startsWith("http") ? "_blank" : undefined}
                          rel={
                            item.schoolHref.startsWith("http") ? "noopener noreferrer" : undefined
                          }
                          className="font-semibold text-neutral-900 hover:underline decoration-neutral-300 underline-offset-4 dark:text-white dark:decoration-neutral-600"
                        >
                          {item.school}
                        </a>
                      ) : (
                        <strong className="font-semibold text-neutral-900 dark:text-white">
                          {item.school}
                        </strong>
                      )}
                      <ul className="mt-1.5 list-disc pl-5">
                        {item.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
