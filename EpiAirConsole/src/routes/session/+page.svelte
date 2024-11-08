<script lang="ts">
    import { onMount } from 'svelte';
    import QRCode from 'qrcode';


    let qrCode: string = '';
    let randomNumber: number;

    const generateQRCode = async () => {
        const data = "https://www.youtube.com/watch?v=f_WuRfuMXQw";
        try {
            qrCode = await QRCode.toDataURL(data);
        } catch (err) {
            console.error('Erreur lors de la génération du QR code', err);
        }
    }
    onMount(() => {
        randomNumber = Math.floor(Math.random() * 90000) + 10000;
        generateQRCode();
    });
</script>

<div class="flex flex-col w-full h-1/2 justify-center items-center self-center">
    <div class="flex flex-col w-1/2 h-1/5 justify-between items-center">
        <h1> Connect ur Phones As Controller </h1>
        <p> and lets have fun youhou </p>
    </div>
    <div class="flex flex-col w-1/5 h-10 justify-center items-center bg-emerald-600 rounded m-10">
        <p>{randomNumber}</p>
    </div>
    <div class="flex m-10 justify-center items-center">
        {#if qrCode}
            <img src={qrCode} alt="QR Code" />
        {:else}
            <p>Chargement du QR code...</p>
        {/if}
    </div>
</div>
