<template>
    <div>
        <client-only>
            <header>
                <navbar />
                <topnav />
            </header>
        </client-only>
        <slot />
    </div>
</template>