<template>
    <div class="fixed inset-0 bg-[#00000080] flex justify-center items-center">
        <div class="rounded bg-white w-[165px] md:w-[540px] h-[62px] text-dark-golden text-xl flex justify-center items-center">
            {{ $props.msg }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        msg: {
            type: String,
            default: ''
        }
    }
};
</script>