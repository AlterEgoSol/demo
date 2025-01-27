<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    
    // Simulated wallet connection
    let walletConnected = false;
    
    function connectWallet() {
        walletConnected = true;
    }
</script>

{#if !walletConnected && browser}
    <div class="connect-wallet">
        <div class="connect-card">
            <h2>Connect Your Wallet</h2>
            <p>To access the AlterEgo demo, please connect your Solana wallet.</p>
            <button on:click={connectWallet}>
                Connect Phantom Wallet
            </button>
        </div>
    </div>
{:else}
    <slot />
{/if}

<style>
    .connect-wallet {
        display: grid;
        place-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #f8f9fc 0%, #e6f0ff 100%);
    }
    
    .connect-card {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        text-align: center;
        max-width: 400px;
    }
    
    button {
        background: #0066ff;
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s;
    }
    
    button:hover {
        background: #0052cc;
    }
</style> 