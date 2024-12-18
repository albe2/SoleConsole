<script lang="ts">
    import { onMount } from 'svelte';

    let unityCanvas: HTMLCanvasElement | null = null;
    let container: HTMLElement | null = null;

    const buildUrl = '/unity/Build/';
    const config = {
        dataUrl: buildUrl + "build.data.gz",
        frameworkUrl: buildUrl + "build.framework.js.gz",
        codeUrl: buildUrl + "build.wasm.gz",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "My project (2)",
        productVersion: "1.0",
        showBanner: (msg: string, type: string) => {
            console.log(`${type}: ${msg}`);
        }
    };

    onMount(() => {
        const loaderUrl = buildUrl + "build.loader.js";

        const script = document.createElement('script');
        script.src = loaderUrl;

        script.onload = () => {
            if (typeof (window as any).createUnityInstance === 'function') {
                const createUnityInstance = (window as any).createUnityInstance;
                if (unityCanvas) {
                    createUnityInstance(unityCanvas, config).catch((message: string) => {
                        console.error(message);
                    });
                }
            } else {
                console.error("createUnityInstance n'est pas disponible");
            }
        };

        document.body.appendChild(script);
        if (container && container.requestFullscreen) {
            container.requestFullscreen()
                .catch((err) => console.error('Erreur lors de la mise en plein écran:', err));
        }
    });
</script>

<div bind:this={container} class="flex items-center justify-center h-screen w-screen bg-black">
    <canvas id="unity-canvas" bind:this={unityCanvas} tabindex="-1" class="w-full h-full"></canvas>
</div>