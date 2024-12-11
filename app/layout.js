import './globals.css'

export const metadata = { 
  title: "TODO APP",
  description: "A Todo Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        <div className="w-full lg:px-20 px-5 py-3 flex justify-between items-center bg-[#7e64ff] text-white text-xl lg:text-2xl font-bold">
          TodoApp
        </div>
        {children}
      </body>
    </html>
  );
}

