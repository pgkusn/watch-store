<template>
    <div class="sm:px-8 md:flex-grow md:pl-[8.6%] mt-6 md:mt-0">
        <div class="flex flex-col md:flex-row md:items-center mb-1 sm:mb-0 justify-between w-full">
            <h2 class="text-xl leading-tight hidden md:block">
                訂單查詢
            </h2>
            <div class="text-end mt-4 md:mt-0">
                <form class="flex w-full max-w-sm space-x-3">
                    <div class="relative">
                        <input type="text" class="rounded-lg border-transparent flex-1 appearance-none border border-default-gray-300 w-full py-2 px-4 bg-white text-default-gray-700 placeholder-default-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-dark-golden focus:border-transparent" placeholder="訂單編號">
                    </div>
                    <button class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-dark-golden rounded-lg shadow-md hover:bg-dark-golden focus:outline-none focus:ring-2 focus:ring-dark-golden focus:ring-offset-2 focus:ring-offset-dark-golden" type="submit">
                        搜尋
                    </button>
                </form>
            </div>
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th scope="col" class="px-5 py-3 bg-white  border-b border-default-gray-200 text-default-gray-800  text-left text-sm uppercase font-normal min-w-[140px]">
                                訂單編號
                            </th>
                            <th scope="col" class="px-5 py-3 bg-white  border-b border-default-gray-200 text-default-gray-800  text-left text-sm uppercase font-normal min-w-[140px]">
                                訂單內容
                            </th>
                            <th scope="col" class="px-5 py-3 bg-white  border-b border-default-gray-200 text-default-gray-800  text-left text-sm uppercase font-normal min-w-[140px]">
                                訂單金額
                            </th>
                            <th scope="col" class="px-5 py-3 bg-white  border-b border-default-gray-200 text-default-gray-800  text-left text-sm uppercase font-normal min-w-[140px]">
                                建立時間
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-default-gray-900">
                        <tr v-for="n in 4" :key="n">
                            <td class="px-5 py-5 border-b border-default-gray-200 bg-white text-sm">
                                20210328097348
                            </td>
                            <td class="px-5 py-5 border-b border-default-gray-200 bg-white text-sm whitespace-nowrap">
                                Poppy & Barley x1<br>
                                Poppy & Barley x2
                            </td>
                            <td class="px-5 py-5 border-b border-default-gray-200 bg-white text-sm">
                                $1,488
                            </td>
                            <td class="px-5 py-5 border-b border-default-gray-200 bg-white text-sm">
                                2021-06-10 09:13:57
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="px-5 bg-white py-4 flex flex-col xs:flex-row items-center xs:justify-between">
            <div class="flex items-center">
                <button type="button" class="w-full p-4 border border-[#e5e7eb] text-base rounded-l-xl text-default-gray-600 bg-white hover:bg-default-gray-100">
                    <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        class=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
                    </svg>
                </button>
                <button type="button" class="w-full px-4 py-2 border-t border-[#e5e7eb] border-b text-base text-dark-golden bg-white hover:bg-default-gray-100 ">
                    1
                </button>
                <button type="button" class="w-full px-4 py-2 border border-[#e5e7eb] text-base text-default-gray-600 bg-white hover:bg-default-gray-100">
                    2
                </button>
                <button type="button" class="w-full px-4 py-2 border-t border-[#e5e7eb] border-b text-base text-default-gray-600 bg-white hover:bg-default-gray-100">
                    3
                </button>
                <button type="button" class="w-full px-4 py-2 border border-[#e5e7eb] text-base text-default-gray-600 bg-white hover:bg-default-gray-100">
                    4
                </button>
                <button type="button" class="w-full p-4 border-t border-b border-r border-[#e5e7eb] text-base  rounded-r-xl text-default-gray-600 bg-white hover:bg-default-gray-100">
                    <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        class=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderHistory'
};
</script>