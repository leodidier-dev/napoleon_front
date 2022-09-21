<template>
    <nav>
        <h1 class="fs-h1">Premier empire dans le Bas-Rhin</h1>
        <ul>
            <li>Législation</li>
            <li>Militaires</li>
            <li>Régiments</li>
            <li>La vie militaire dans le Bas-Rhin</li>
            <li>Dentzela</li>
        </ul>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 24px;

    ul {
        display: flex;
        column-gap: 20px;

        li {
            display: inline;
            font-weight: 600;
            font-size: 14rem;
            text-transform: uppercase;
        }
    }
}

</style>