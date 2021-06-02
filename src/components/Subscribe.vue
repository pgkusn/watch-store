<template>
    <div class="bg-cover bg-left" style="background-image: url(https://hexschool.github.io/webLayoutTraining1st/perfume-week6/index10.jpg)">
        <div class="container h-[600px] pt-[312px]">
            <form class="max-w-[350px] mx-auto md:ml-0">
                <p class="text-dark-gray text-[32px]">
                    記得<br>訂閱以獲取更多資訊！
                </p>
                <div class="flex mt-5">
                    <input type="email" placeholder="Your email address" class="flex-grow w-0 h-[60px] pl-[14.5px] rounded-l border-2 border-dark-golden placeholder-dark-gray outline-none">
                    <input type="submit" value="Subscribe" class="w-[129px] h-[60px] text-white rounded-r bg-dark-golden">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Subscribe'
};
</script>