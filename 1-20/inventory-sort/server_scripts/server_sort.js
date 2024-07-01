
const Inventory = Java.loadClass('net.minecraft.world.entity.player.Inventory');

NetworkEvents.dataReceived('sort', e => {
    let { player, data } = e;
    if (allowedMenus[data.type] != -1) {
        let { containerMenu } = player;
        let containers = {}; // Usually will only be 1 container per menu, but can never be too careful
        containerMenu.slots.forEach(slot => {
            let { container } = slot;
            if (!(container instanceof Inventory)) {
                if (!containers[container]) {
                    containers[container] = {
                       list: Utils.newList(),
                       cont: container
                    }
                }
                let stack = slot.remove(64);
                if (!stack.empty) {
                    containers[container].list.add(stack);
                }
            }
        });
        for (let container in containers) {
            containers[container].list.sort((stack0, stack1) => stack0.item.idLocation.compareTo(stack1.item.idLocation));
            containers[container].list.forEach(stack => {
                containers[container].cont.insertItem(stack, false);
            });
        }
    }
})

// Add a menu type to this list to let player sort that menu. Make sure to test!
// This implementation will delete items if the menu's container is, for some reason, not compatable
const allowedMenus = [
    'minecraft:generic_3x3',
    'minecraft:generic_9x3',
    'minecraft:generic_9x6',
    'minecraft:shulker_box',
    'tfc:chest_9x2',
    'tfc:chest_9x4',
    'computercraft:turtle'
]