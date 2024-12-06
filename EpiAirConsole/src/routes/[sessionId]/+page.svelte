<script lang="ts">
    import { onMount } from 'svelte';
    import QRCode from 'qrcode';
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';

    let qrCode: string = '';
    let users: { name: string }[] = [];
    let isMobileDevice = false;
    let client: string | null = null;

    async function joinSession(): Promise<void> {
        try {
            const sessionCode = new URL(window.location.href).pathname.split('/').pop();
            const response = await fetch('/API/joinSession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionCode: sessionCode, userID: client}),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.error('userID not found. ');
                    goto('/createProfile');
                } else {
                    alert('Failed to join session. Please try again.');
                    return;
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while creating the session. Please try again.');
        }
    }

    const isConnected = async () => {
        if (client) {
            joinSession();
        } else {
            goto(`/createProfile`);
        }
    };

    const generateQRCode = async () => {
        const data2 = window.location.href;
        try {
            qrCode = await QRCode.toDataURL(data2);
        } catch (err) {
            console.error('Erreur lors de la génération du QR code', err);
        }
    };

    const fetchUsers = async () => {
        const sessionId = $page.params.sessionId;

        try {
            const response = await fetch(`/API/getSessionUsers?sessionId=${sessionId}`);
            if (response.ok) {
                const data = await response.json();
                users = data.userNames.map((name: string) => ({ name }));
                console.log(users);
            } else {
                if (response.status === 401) {
                    console.error('Session non autorisée, redirection vers la page d\'accueil.');
                    goto('/');
                } else {
                    console.error('Erreur lors de la récupération des utilisateurs');
                }
            }
        } catch (err) {
            console.error('Erreur réseau', err);
        }
    };


    onMount(() => {
        isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
        client = localStorage.getItem('userId');
        if (isMobileDevice) {
            isConnected();
        }
        generateQRCode();
        fetchUsers();
    });

    const getRandomColor = () => {
        const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFC300', '#C70039'];
        return colors[Math.floor(Math.random() * colors.length)];
    };
</script>

{#if !isMobileDevice}
    <div class="flex flex-row w-full h-full justify-center items-center self-center bg-gradient-to-b from-[#0900FF] to-[#020037]">
        <div class="flex flex-col w-1/2 h-full justify-center items-center">
            <div class="flex flex-col w-full h-1/5 justify-between items-center">
                 <h1> Connect ur Phones As Controller </h1>
                 <p> and lets have fun :) </p>
             </div>
             <div class="flex flex-col w-1/5 h-10 justify-center items-center bg-emerald-600 rounded m-10">
                 <p> {$page.params.sessionId} </p>
             </div>
             <div class="flex m-10 justify-center items-center">
                 {#if qrCode}
                     <img src={qrCode} alt="QR Code" />
                 {:else}
                     <p>Chargement du QR code...</p>
                 {/if}
             </div>
        </div>
        <div class="flex flex-wrap w-1/2 h-full justify-center items-center">
            {#each users as user}
                <div class="w-16 h-16 flex justify-center items-center rounded-full text-white text-xl font-bold m-2"
                     style="background-color: {getRandomColor()}">
                    {user.name.charAt(0).toUpperCase()}
                </div>
            {/each}
        </div>
    </div>
{:else}
    <div class="flex flex-col w-full h-full justify-center items-center self-center bg-gradient-to-b from-[#0900FF] to-[#020037]">
        <div class="flex flex-wrap justify-center items-center">
            {#each users as user}
                <div class="w-16 h-16 flex justify-center items-center rounded-full text-white text-xl font-bold m-2"
                     style="background-color: {getRandomColor()}">
                    {user.name.charAt(0).toUpperCase()}
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    h1 {
        color: white;
        font-size: 2rem;
    }
    p {
        color: white;
        font-size: 1rem;
    }
</style>
