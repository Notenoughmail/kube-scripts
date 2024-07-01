
const Button = Java.loadClass('net.minecraft.client.gui.components.Button');

NetworkEvents.dataReceived('sort_init', e => {
    let { data } = e;
    if (buttonPositions[data.type]) {
        let { screen } = Client;
        screen.addRenderableWidget(buttonPositions[data.type](Button.builder('Δ', button => {
            Client.player.sendData('sort', { type: data.type });
            Client.scheduleInTicks(5, event => {
                button.focused = false;
            });
        }).bounds(screen.guiLeft + screen.getXSize() - 16, screen.guiTop + 4, 12, 12), screen).build());
    }
})

const buttonPositions = {
    'minecraft:generic_3x3': (builder, screen) => builder,
    'minecraft:generic_9x3': (builder, screen) => builder,
    'minecraft:generic_9x6': (builder, screen) => builder,
    'minecraft:shulker_box': (builder, screen) => builder,
    'tfc:chest_9x2': (builder, screen) => builder,
    'tfc:chest_9x4': (builder, screen) => builder,
    'computercraft:turtle': (builder, screen) => builder.pos(screen.guiLeft + screen.getXSize() - 25, screen.guiTop + screen.getYSize() - 45)
}
