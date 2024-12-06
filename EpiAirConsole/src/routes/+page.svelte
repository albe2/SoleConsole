<script lang="ts">
    import { goto } from '$app/navigation';
    import {onMount} from "svelte";

    let isMobileDevice = false;

    function sessionRedirection(user: boolean) : void {
        if (!user) {
            createSession();
        } else {
            goto(`/createProfile`);
        }
        return;
    }

    async function createSession(): Promise<void> {
        try {
            const response = await fetch('/API/createSession', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                console.error('Failed to create session:', errorMessage);
                alert('Failed to create session. Please try again.');
                return;
            }

            const { accessID } = await response.json();
            console.log('Access ID:', accessID);

            goto(`/${accessID}`);
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while creating the session. Please try again.');
        }

        onMount(() => {
            isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
        });
    }

</script>


<div class="flex w-full h-full justify-center items-center">
    <video autoplay loop muted class="absolute w-full h-full object-cover brightness-75">
        <source src="/aqua.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    <div class="flex flex-col z-10 w-full h-1/3 justify-between items-center mb-4">
        <div class="flex flex-col w-full h-2/3 justify-evenly items-center">
            <h1 class="text-4xl text-center"> Play Games </h1>
            <p class="font-bold text-3xl text-center"> With your friends </p>
        </div>
        {#if !isMobileDevice}
            <button
                    class="bg-black rounded w-1/4 h-1/4 font-bold text-lg"
                    on:click={() => sessionRedirection(isMobileDevice)}
            > Start Playing Now </button>
        {:else}
            <button
                    class="bg-black rounded w-1/2 h-1/4 font-bold text-lg"
                    on:click={() => sessionRedirection(isMobileDevice)}
            > Start Playing Now </button>
        {/if}
    </div>
</div>
