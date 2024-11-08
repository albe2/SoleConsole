<script>
    import { goto } from '$app/navigation';
</script>


<div class="flex w-full h-full justify-center items-center">
    <div class="flex flex-col w-1/2 h-1/5 justify-between items-center">
        <h1> Playing Games </h1>
        <p> with ur freinds :) </p>
        <button
                class="bg-emerald-600 rounded w-1/5"
                on:click={() => goto('/session')}
        > Play </button>
    </div>
</div>
