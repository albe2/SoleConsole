<script lang="ts">
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    let inputValue: string = '';
    let client = localStorage.getItem('userId');


    async function joinSession(): Promise<void> {
        try {
            const response = await fetch('/API/joinSession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionCode: inputValue, userID: client}),
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                console.error('Failed to create session:', errorMessage);
                alert('Failed to create session. Please try again.');
                return;
            }

            goto(`/${inputValue}`);
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while creating the session. Please try again.');
        }
    }

    const isConnected = async () => {
        if (client) {
            return;
        } else {
            goto(`/createProfile`);
        }
    };

    onMount(() => {
        isConnected();
    });
</script>

<div class="flex flex-col w-full h-full justify-center items-center self-center bg-gradient-to-b from-[#0900FF] to-[#020037]">
    <input
            type="text"
            bind:value={inputValue}
            placeholder="Enter Session Code"
            class="p-2 border rounded-md text-black"
    />
    <button
            on:click={joinSession}
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
        Submit
    </button>
</div>
