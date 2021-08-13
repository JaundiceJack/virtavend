function App() {
  return (
    <body class="grid grid-cols-10 h-screen">
      <div class="col-span-1 sm:block hidden bg-gradient-to-l from-gray-800 to-gray-900">
      </div>
      <div class="col-span-10 sm:col-span-8 flex-grow flex flex-col">
        <nav class="sticky top-0 mx-4 bg-gradient-to-b from-gray-900 to-gray-800 shadow-md h-16 rounded-b-lg flex items-center">
          <a href="#" class="flex flex-row items-center group relative">
          <img src="//live.staticflickr.com/65535/51358278133_0326d83fa7_s.jpg" class="w-11 h-10 ml-3 rounded-md opacity-100 group-hover:opacity-0 transition duration-300" />
          <p class="absolute border-2 border-yellow-400 rounded-md px-2 ml-2 font-bold bg-clip-text text-transparent bg-gradient-to-tl from-yellow-400 to-yellow-600 leading-tight opacity-0 group-hover:opacity-100 transition duration-300">Virta<br/>Vend</p>
          </a>
          <div class="flex-grow flex flex-row justify-center items-center sm:m-0 mb-1">
            <div class="flex sm:flex-row flex-col">
              <a href="#" class="text-white font-semibold transform duration-150 hover:scale-105">Products</a>
              <a href="#" class="sm:ml-5 text-white font-semibold transform duration-150 hover:scale-105">Shipping</a>
            </div>
            <div class="flex sm:flex-row flex-col">
              <a href="#" class="ml-5 text-white font-semibold transform duration-150 hover:scale-105">Contact</a>
              <a href="#" class="ml-5 text-white font-semibold transform duration-150 hover:scale-105">Sign In</a>
            </div>
          </div>
          <a href="#" class="self-center transform duration-150 hover:scale-110"><i class="mr-6 text-white text-xl fa fa-shopping-cart"></i></a>
        </nav>
        <main class="flex-grow flex flex-col">

          <div id="slider" class="m-6 h-56 bg-gray-300 border-2 border-gray-200 rounded-lg"></div>
          <div class="mx-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="h-96 bg-gray-300 border-2 border-gray-200 rounded-lg">
            </div>
            <div class="h-96 bg-gray-300 border-2 border-gray-200 rounded-lg">
            </div>
            <div class="h-96 bg-gray-300 border-2 border-gray-200 rounded-lg">
            </div>
          </div>
          

        </main>
        <footer class="mx-4 bg-gradient-to-t from-gray-900 to-gray-800 shadow-md h-8 rounded-t-lg flex justify-center items-center">
          <i class="fa fa-copyright text-white text-sm"></i>
          <p class="ml-1 font-semibold text-white text-sm">James McNeilan</p>
        </footer>
      </div>
      <div class="col-span-1 sm:block hidden bg-gradient-to-r from-gray-800 to-gray-900">
      </div>
    </body>
  );
}

export default App;
