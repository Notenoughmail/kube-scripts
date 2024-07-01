
ConfigsEvent.client(e => {
    global.enableEntityAutoThirdPerson = e
        .comment(' ', 'Determines if the view should automatically be put into 3rd person when riding certain entities')
        .booleanValue('enableEntityAutoThirdPerson', true);
    global.forwardThirdPersonEntities = e
        .comment(' ', 'The entities that will automatically put the view into forward third person when mounted')
        .stringListValue('forwardThirdPersonEntities', [
            'minecraft:horse',
            'minecraft:donkey',
            'minecraft:mule',
            'minecraft:minecart',
            'minecraft:boat',
            'minecraft:chest_boat',
            'minecraft:llama',
            'minecraft:camel'
        ], s => ResourceLocation.isValidResourceLocation(s));
    global.reverseThirdPersonEntities = e
        .comment(' ', 'The entities that will automatically put the view into reverse third person when mounted')
        .stringListValue('reverseThirdPersonEntities', [
        ], s => ResourceLocation.isValidResourceLocation(s));
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.EntityMountEvent', e => {
    let { mounting, entityMounting, entityBeingMounted } = e;
    if (entityMounting.player) {
        entityMounting.sendData('mount', {
            'mounting': mounting,
            type: getType(entityBeingMounted)
        });
    }
})

function getType(entity) {
    let { type } = entity;
    if (proxyEntities.indexOf(type) != -1) {
        return getType(entity.getVehicle());
    }
    return type;
}

// Entities which aren't really there and are just a proxy for another mob
const proxyEntities = [
]