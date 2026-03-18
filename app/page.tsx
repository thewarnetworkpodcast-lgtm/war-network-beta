import "./globals.css";

export const metadata = {
  title: "W.A.R. Network",
  description: "We’re All Recovering",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <div className="min-h-screen w-full flex justify-center">
          <div className="w-full max-w-[480px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}