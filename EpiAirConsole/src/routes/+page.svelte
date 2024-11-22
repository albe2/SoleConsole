<script lang="ts">
    import { goto } from '$app/navigation';

    let randomNumber: number;

    randomNumber = Math.floor(Math.random() * 90000) + 10000;
</script>


<div class="flex w-full h-full justify-center items-center">
    <video autoplay loop muted class="absolute w-auto min-w-full min-h-full max-w-none brightness-75">
        <source src="/aqua.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    <div class="flex flex-col z-10 w-1/2 h-1/5 justify-between items-center mb-4">
        <div class="flex flex-col w-full h-2/3 justify-evenly items-center">
            <h1 class="text-4xl"> Play Games </h1>
            <p class="font-bold text-3xl"> With your friends </p>
        </div>
        <button
                class="bg-black rounded w-1/2 h-1/3 font-bold text-lg"
                on:click={() => goto(`/${randomNumber}`)}
        > Start Playing Now </button>
    </div>
</div>
