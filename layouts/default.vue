<template>
    <div>
        <client-only>
            <header>
                <navbar />
                <topnav />
            </header>
            <div class="content">
                <div class="container">
                    <slot />
                </div>
            </div>            
        </client-only>
    </div>    
</template>