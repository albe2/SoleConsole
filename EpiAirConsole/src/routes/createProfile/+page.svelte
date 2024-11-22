<p> create profile page </p><script lang="ts">
    import {goto} from "$app/navigation";

    let inputValue: string = '';

    async function joinSession(): Promise<void> {
        try {
            const response = await fetch('/API/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: inputValue }),
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                console.error('Failed to create user:', errorMessage);
                alert('Failed to create User. Please try again.');
                return;
            }

            localStorage.setItem('user', JSON.stringify(response));
            goto(`/joinSession`);
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while creating the User. Please try again.');
        }
    }
</script>

<div class="flex flex-col w-full h-full justify-center items-center self-center bg-gradient-to-b from-[#0900FF] to-[#020037]">
    <input
            type="text"
            bind:value={inputValue}
            placeholder="Enter Pseudo"
            class="p-2 border rounded-md text-black"
    />
    <button
            on:click={joinSession}
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
        Submit
    </button>
</div>
