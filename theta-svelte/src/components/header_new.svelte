<svelte:options tag="my-header" />
<script lang="ts">
  import { user } from "./stores.js";
  //export let name
  //var value

  console.log("header", $user);
  if ($user == "null") {
    user.set("");
  }
  function logout() {
    user.set("");
    console.log($user);
  }

  // convert to svelte
  let sideBar = document.getElementById("mobile-nav");
    let menu = document.getElementById("menu");
    let cross = document.getElementById("cross");
    const sidebarHandler = (check) => {
        if (check) {
            sideBar.style.transform = "translateX(0px)";
            menu.classList.add("hidden");
            cross.classList.remove("hidden");
        } else {
            sideBar.style.transform = "translateX(-100%)";
            menu.classList.remove("hidden");
            cross.classList.add("hidden");
        }
    };
    function dropdownHandler(element) {
        let single = element.getElementsByTagName("ul")[0];
        single.classList.toggle("hidden");
    }

</script>

<main>
    
    <div class="w-full h-full">
        <div class="flex flex-no-wrap">
            <!-- Sidebar starts -->
            <div style="min-height: 700px" class="w-64 absolute lg:relative bg-white shadow h-screen flex-col justify-between hidden lg:flex pb-12">
                <div class="px-8">
                    <div class="h-16 w-full flex items-center">
                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_indicator-svg1.svg" alt="logo">
                    </div>
                    <ul class="mt-12">
                        <li class="flex w-full justify-between text-indigo-700 cursor-pointer items-center mb-6">
                            <a href="javascript:void(0)" class="flex items-center">
                                <span class="text-sm">Dashboard</span>
                            </a>
                            <div class="py-1 px-3 bg-indigo-700 rounded text-white flex items-center justify-center text-xs">5</div>
                        </li>
                        <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                            <a href="javascript:void(0)" class="flex items-center">
                                <span class="text-sm">Products</span>
                            </a>
                            <div class="py-1 px-3 bg-indigo-700 rounded text-white flex items-center justify-center text-xs">8</div>
                        </li>
                        <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                            <a href="javascript:void(0)" class="flex items-center">
                                <span class="text-sm">Performance</span>
                            </a>
                        </li>
                        <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                            <a href="javascript:void(0)" class="flex items-center">
                                <span class="text-sm">Deliverables</span>
                            </a>
                        </li>
                        <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                            <a href="javascript:void(0)" class="flex items-center">
                                <span class="text-sm">Invoices</span>
                            </a>
                            <div class="py-1 px-3 bg-indigo-700 rounded text-white flex items-center justify-center text-xs">25</div>
                        </li>
                        <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                            <a href="javascript:void(0)" class="flex items-center">
                                <span class="text-sm">Inventory</span>
                            </a>
                        </li>
                        <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                            <a href="javascript:void(0)" class="flex items-center">
                                <span class="text-sm">Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>  
            <div class="absolute w-full h-full transform -translate-x-full z-40 lg:hidden" id="mobile-nav">
                <div class="bg-gray-800 opacity-50 w-full h-full absolute" onclick="sidebarHandler(false)"></div>
                <div class="w-64 md:w-96 absolute z-40 bg-white shadow h-full flex-col justify-between lg:hidden pb-4 transition duration-150 ease-in-out">
                    <div class="flex flex-col justify-between h-full">
                        <div>
                            <div class="flex items-center justify-between px-8">
                                <div class="h-16 w-full flex items-center">
                                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_indicator-svg1.svg" alt="logo">
                                </div>
                                <div id="closeSideBar" class="flex items-center justify-center h-10 w-10 " onclick="sidebarHandler(false)">
                                   <button aria-label="close sidebar"  class="focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_indicator-svg2.svg" alt="cross">
                                   </button>
                                </div>
                            </div>
                            <div class="px-8">
                                <ul class="mt-12">
                                    <li class="flex w-full justify-between text-indigo-700 cursor-pointer items-center mb-6">
                                        <a href="javascript:void(0)" class="flex items-center">
                                            <span class="xl:text-base md:text-2xl text-base ml-2">Dashboard</span>
                                        </a>
                                        <div class="py-1 px-3 bg-indigo-700 rounded text-white flex items-center justify-center text-xs">5</div>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                                        <a href="javascript:void(0)" class="flex items-center">
                                            <span class="xl:text-base md:text-2xl text-base ml-2">Products</span>
                                        </a>
                                        <div class="py-1 px-3 bg-indigo-700 rounded text-white flex items-center justify-center text-xs">8</div>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                                        <a href="javascript:void(0)" class="flex items-center">
                                            <span class="xl:text-base md:text-2xl text-base ml-2">Performance</span>
                                        </a>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                                        <a href="javascript:void(0)" class="flex items-center">
                                            <span class="xl:text-base md:text-2xl text-base ml-2">Deliverables</span>
                                        </a>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                                        <a href="javascript:void(0)" class="flex items-center">
                                            <span class="xl:text-base md:text-2xl text-base ml-2">Invoices</span>
                                        </a>
                                        <div class="py-1 px-3 bg-indigo-700 rounded text-white flex items-center justify-center text-xs">25</div>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                                        <a href="javascript:void(0)" class="flex items-center">
                                            <span class="xl:text-base md:text-2xl text-base ml-2">Inventory</span>
                                        </a>
                                    </li>
                                    <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                                        <a href="javascript:void(0)" class="flex items-center">
                                            <span class="xl:text-base md:text-2xl text-base ml-2">Settings</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="flex justify-center mb-4 w-full px-6">
                                <div class="relative w-full">
                                    <div class="text-gray-600 absolute ml-4 inset-0 m-auto w-4 h-4">
                                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_indicator-svg3.svg" alt="Search">
                                    </div>
                                    <input class="bg-gray-100 focus:outline-none border border-gray-200 focus:border-indigo-700 rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2 placeholder-gray-600" type="text" placeholder="Search" />
                                </div>
                            </div>
                            <div class="border-t border-gray-300">
                                <div class="w-full flex items-center justify-between px-6 pt-1">
                                    <div class="flex items-center">
                                        <img alt="display avatar" role="img" src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png" class="w-8 h-8 rounded-md" />
                                        <p class="md:text-xl text-gray-800 text-base leading-4 ml-2">Jane Doe</p>
                                    </div>
                                    <ul class="flex">
                                        <li class="cursor-pointer text-white pt-5 pb-3">
                                            <button aria-label="open chats" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_indicator-svg4.svg" alt="chats">
                                            </button>
                                        </li>
                                        <li class="cursor-pointer text-white pt-5 pb-3 pl-3">
                                            <button aria-label="show notifications" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_indicator-svg5.svg" alt="notifications">
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Mobile responsive sidebar-->
            <!-- Sidebar ends -->
            <div class="w-full">
                <!-- Navigation starts -->
                <nav class="h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow relative z-0">
                    <div class="hidden lg:flex w-full pr-6">
                        <div class="w-1/2 h-full hidden lg:flex items-center pl-6 pr-24">
                            <div class="relative w-full">
                                <div class="text-gray-600 absolute ml-4 inset-0 m-auto w-4 h-4">
                                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_indicator-svg3.svg" alt="Search">
                                </div>
                                <input class="border border-gray-100 focus:outline-none focus:border-indigo-700 rounded w-full text-sm text-gray-500 bg-gray-100 pl-12 py-2 placeholder-gray-600" type="text" placeholder="Search" />
                            </div>
                        </div>
                        <div class="w-1/2 hidden lg:flex">
                            <div class="w-full flex items-center pl-8 justify-end">
                                <div class="h-full w-20 flex items-center justify-center border-r border-l">
                                    <button aria-label="open notifications" class="relative cursor-pointer text-gray-600 focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_indicator-svg5.svg" alt="notifications">
                                        <div class="w-2 h-2 rounded-full bg-red-400 border border-white absolute inset-0 mt-1 mr-1 m-auto"></div>
                                    </button>
                                </div>
                                <div class="h-full w-20 flex items-center justify-center border-r mr-4 cursor-pointer text-gray-600 ">
                                    <button aria-label="Open chats" class="focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_indicator-svg4.svg" alt="chats">
                                    </button>
                                </div>
                                <div class="flex items-center relative cursor-pointer" onclick="dropdownHandler(this)">
                                    <div class="rounded-full">
                                        <ul class="p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-16 hidden">
                                            <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                                                <div class="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <circle cx="12" cy="7" r="4" />
                                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                    </svg>
                                                    <a href="havascript:"void(0) class="text-sm ml-2">My Profile</a>
                                                </div>
                                            </li>
                                            <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mt-2">
                                                <div class="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                                        <path d="M7 12h14l-3 -3m0 6l3 -3" />
                                                    </svg>
                                                    <a href="havascript:"void(0) class="text-sm ml-2">Sign out</a>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="relative">
                                            <img class="rounded-full h-10 w-10 object-cover" src="https://tuk-cdn.s3.amazonaws.com/assets/components/sidebar_layout/sl_1.png" alt="display avatar" role="img" />
                                            <div class="w-2 h-2 rounded-full bg-green-400 border border-white absolute inset-0 mb-0 mr-0 m-auto"></div>
                                        </div>
                                    </div>
                                    <p class="text-gray-800 text-sm mx-3">Jane Doe</p>
                                    <button aria-label="toggle profile options" class="cursor-pointer text-gray-600 focus:outline-none focus:ring-2 rounded focus:ring-gray-600" onclick="dropdownHandler(this)">
                                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_indicator-svg6.svg" alt="">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button aria-label="open sidebar Menu" class="text-gray-600 mr-8 visible lg:hidden relative focus:outline-none focus:ring-2 rounded focus:ring-gray-600" onclick="sidebarHandler(true)" id="menu">
                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_indicator-svg7.svg" alt="toggler">
                    </button>
                </nav>
                <!-- Navigation ends -->
                <!-- Remove class [ h-64 ] when adding a card block -->
                <div class="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                    <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border -->
                    <div class="w-full h-full rounded border-dashed border-2 border-gray-300">
                        <!-- Place your content here -->
                    </div>
                </div>
            </div>
        </div>
      
      
    </div>

</main>