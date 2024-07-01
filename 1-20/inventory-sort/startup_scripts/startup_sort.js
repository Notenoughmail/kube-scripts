
ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerContainerEvent$Open', e => {
    try {
        let { container } = e;
        let { type } = container; // This throws instead of returning null
        e.entity.sendData('sort_init', {
            type: Utils.getRegistry('minecraft:menu').getId(type).toString() // Hopefully this arrives after the screen init event
        });
    } catch (ignored) {}
})
