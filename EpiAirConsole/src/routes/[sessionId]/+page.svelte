<script lang="ts">
    import { onMount } from 'svelte';
    import QRCode from 'qrcode';
    import { page } from "$app/stores";

    let qrCode: string = '';

    const generateQRCode = async () => {
        const data2 = window.location.href;
        console.log(data2);
        try {
            qrCode = await QRCode.toDataURL(data2);
        } catch (err) {
            console.error('Erreur lors de la génération du QR code', err);
        }
    }
    onMount(() => {
        generateQRCode();
    });
</script>

<div class="flex flex-col w-full h-1/2 justify-center items-center self-center">
    <div class="flex flex-col w-1/2 h-1/5 justify-between items-center">
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
