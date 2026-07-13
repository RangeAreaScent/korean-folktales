// AdSense script lives only here, not in the root layout — Google flagged
// the interactive coloring app screens ("/") as "screens without
// publisher-content ... used for behavioral purposes" during review. The
// route group below wraps only the editorial pages (About/Privacy/folktale
// info pages), which are the ones that actually carry publisher content.
export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Plain <script> on purpose — AdSense's verification crawler looks
          for a literal <script src="..."> tag in the raw server HTML.
          next/script never emits that; it queues the load via an inline
          bootstrap script instead, which the crawler doesn't recognize. */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2376980284402579"
        crossOrigin="anonymous"
      />
      {children}
    </>
  );
}
