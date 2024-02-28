import { at } from 'lodash';

/* eslint-disable import/no-anonymous-default-export */
enum Atr {
  health = 'Health',
  attkDmg = 'Attack Damage',
  mgkDmg = 'Magic Damage',
  attkSpd = 'Attack Damage',
  critChc = 'Critical Chance',
  critDmg = 'Critical Damage',
  cdn = 'Cooldown',
  mvSpd = 'Move Speed',
  ddgChc = 'Dodge Chance',
  lfStl = 'Life Steal',
  regen = 'Health Regen',
}

const Abilities = {
  Ambush: {
    img: 'Ambush.png',
    description: 'Temporarily goes invicible and become invulnerable.',
  },
  'Aqua Protection': {
    img: 'Aqua Protection.png',
    description: 'Blocks all incoming projectiles.',
  },
  'Battle Cry': {
    img: 'Battle Cry.png',
    description: 'Erupts dealing 40 damage to all foes nearby and knocking them back.',
  },
  'Berserk Axe': {
    img: 'Berserk Axe.png',
    description:
      'Spawns an orbiting axe that deals damage and a chance to cause bleeding.',
  },
  'Blinding Spark': {
    img: 'Blinding Spark.png',
    description:
      'Spawn an electric circle that follows the player, damages all enemies it passes through and leaving them vulnerable.',
  },
  'Blood Lust': {
    img: 'Blood Lust.png',
    description: "Drains portion of all enemies' health in the room.",
  },
  Boomerang: {
    img: 'Boomerang.png',
    description: "Throws a boomerang that deals damage to enemies' hit.",
  },
  'Brittle Ice Shield': {
    img: 'Brittle Ice Shield.png',
    description:
      'Spawns an ice shield that blocks projectiles. After few hits, the shield breaks then shoots ice shards dealing damage to enemies.',
  },
  Chronobreak: {
    img: 'Chronobreak.png',
    description: 'Stops time causing all enemies to be static for a few seconds.',
  },
  Cyclone: {
    img: 'Cyclone.png',
    description: 'Create a cyclone that moves towards nearest enemy.',
  },
  'Dark Swing': {
    img: 'Dark Swing.png',
    description:
      'Swing the sword dealing damage to all enemies hit and can make them vulnerable to succeeding attacks.',
  },
  'Death Gaze': {
    img: 'Death Gaze.png',
    description:
      'Sends shivers down the spine of its victims, causing a gradual but inevitable decline in life force.',
  },
  'Death Ray': {
    img: 'Death Ray.png',
    description: 'Fires a laser dealing huge damage.',
  },
  'Demonic Siphon': {
    img: 'Demonic Siphon.png',
    description:
      'Deals damage overtime and heals the player by how many enemies are caught in the area.',
  },
  Earthquake: {
    img: 'Earthquake.png',
    description: 'Cause an earthquake that damages and stun enemies in a huge area. ',
  },
  'Electric Discharge': {
    img: 'Electric Discharge.png',
    description:
      'Discharge stored energy dealing heavy damage and stuns surrounding foes.',
  },
  Eruption: {
    img: 'Eruption.png',
    description: 'Explodes and damages all surrounding foes inflicting burn.',
  },
  'Fire Arrow': {
    img: 'Fire Arrow.png',
    description: 'Fires a flaming projectile that inflicts damage and burn.',
  },
  'Fire Barrage': {
    img: 'Fire Barrage.png',
    description:
      'Fires a barrage of fireballs dealing damage to enemies and has a chance to inflict burn.',
  },
  'Fire Cloak': {
    img: 'Fire Cloak.png',
    description:
      'Shrouds self in fire dealing damage and inflicting burn to nearby enemies.',
  },
  'Giant Stomp': {
    img: 'Giant Stomp.png',
    description: 'Summons a Golem foot that crashes into an area dealing AoE damage.',
  },
  Gigantum: {
    img: 'Gigantum.png',
    description: 'Increases size and attack damage for a short amount of time.',
  },
  'Hail of Blades': {
    img: 'Hail of Blades.png',
    description: 'Throw leaf blades dealing damage to enemies and causing them to bleed.',
  },
  'Hail Storm': {
    img: 'HailStorm.png',
    description: 'Deals damage and slow all enemies in the room.',
  },
  'Healing Call': {
    img: 'Healing Call.png',
    description: 'Mend the wounds of all team members.',
  },
  'Ice Path': {
    img: 'Ice Path.png',
    description: 'Creates an ice path that freezes enemies on collision.',
  },
  'Ice Shot': {
    img: 'Ice Shot.png',
    description: 'Shoots an icy projectile that freezes foes that have been hit.',
  },
  'Ice Wall': {
    img: 'Ice Wall.png',
    description:
      'Spawns pillar of ice at the targetted location that blocks projectiles.',
  },
  'Ice Tornado': {
    img: 'IceTornado.png',
    description: 'Spawns an ice tornado that freezes enemies and deal damage over time.',
  },
  'Impaling Bolt': {
    img: 'Impaling Bolt.png',
    description:
      'Shoots a bolt that pierces through enemies dealing damage and stuns them.',
  },
  'Meteor Shower': {
    img: 'MeteorShower.png',
    description:
      'Cast a shower of meteor dealing damage to all enemies in the area for few seconds.',
  },
  Miasma: {
    img: 'Miasma.png',
    description:
      'Creates an area around the player that inflicts random various negative effects to foes entering it.',
  },
  Multishot: {
    img: 'Multishot.png',
    description: 'Fires a multiple shot of arrows dealing damage to enemies.',
  },
  'Path of Fire': {
    img: 'Path of Fire.png',
    description: 'Leaves a burning trail that damages foes that walk on to it.',
  },
  'Plasma Cannon': {
    img: 'Plasma Cannon.png',
    description:
      "Fires a straight beam of lightning dealing damage to all enemies in it's path",
  },
  'Poisoned Tip': {
    img: 'Poisoned Tip.png',
    description: 'Fires a penatrating shot that inflicts poison to all in its path.',
  },
  'Quick Dash': {
    img: 'Quick Dash',
    description: 'Quickly dash towards targeted direction.',
  },
  'Reckless Axe': {
    img: 'Reckless Axe.png',
    description:
      'Spawn an axe that strikes the ground dealing damage to all enemies around and has a chance to stun them.',
  },
  'Rock Throw': {
    img: 'Boulder Toss.png',
    description:
      'Throws a boulder of rock dealing damage and has a chance to stun enemies.',
  },
  Smite: {
    img: 'Smite.png',
    description:
      'Throws a boulder of rock dealing damage and has a chance to stun enemies.',
  },
  'Spark Sanctuary': {
    img: 'Spark Sanctuary.png',
    description:
      'Cast a thunderstorm that only targets all enemies across the room, damaging and stunning them.',
  },
  'Spark Splitter': {
    img: 'Spark Splitter.png',
    description:
      'Fires 3 low damage spark projectiles that stun foes hit for a short time.',
  },
  'Static Jolt': {
    img: 'Static Jolt.png',
    description: 'Inflicts static charges to enemies that the player passes.',
  },
  'Thorn Shield': {
    img: 'Thorn Shield.png',
    description: 'Creates a spiky shield that damages nearby enemies.',
  },
  Torrent: {
    img: 'Torrent.png',
    description: 'Summons a pillar of water damaging surrounding foes.',
  },
  'Toxic Gas': {
    img: 'Toxic Gas.png',
    description: 'Leaves a trail of poisonous gas that damages enemy.',
  },
  Tsunami: {
    img: 'Tsunami.png',
    description: 'Summons a tidal wave dealing damage to foes in its path.',
  },
  Vanguard: {
    img: 'Vanguard.png',
    description: 'Spawns two protective shields at both sides blocking projectiles.',
  },
  Winter: {
    img: 'Winter.png',
    description:
      'Summons a snowstorm encompassing the whole room, dealing damage overtime.',
  },
};

const Parts = {
  archer: {
    baseStats: [
      { attribute: Atr.health, modifier: '60' },
      { attribute: Atr.attkDmg, modifier: '5 (Ranged)' },
      { attribute: Atr.attkSpd, modifier: '0.6' },
      { attribute: Atr.critChc, modifier: '10%' },
      { attribute: Atr.critDmg, modifier: '50%' },
      { attribute: Atr.mgkDmg, modifier: '0' },
      { attribute: Atr.mvSpd, modifier: '5' },
      { attribute: Atr.ddgChc, modifier: '25%' },
    ],
    legendary: {
      ability: Abilities['Impaling Bolt'],
      stat: [
        { attribute: Atr.health, modifier: '60' },
        { attribute: Atr.attkDmg, modifier: '5 (Ranged)' },
        { attribute: Atr.attkSpd, modifier: '0.6' },
        { attribute: Atr.critChc, modifier: '10%' },
        { attribute: Atr.critDmg, modifier: '50%' },
        { attribute: Atr.mgkDmg, modifier: '0' },
        { attribute: Atr.mvSpd, modifier: '5' },
        { attribute: Atr.ddgChc, modifier: '25%' },
      ],
    },
    hats: {
      'Wild Fire': { ability: Abilities['Meteor Shower'] },
      'Snowy Hunter': { ability: Abilities['Ice Shot'] },
      'Electro Shooter': { ability: Abilities['Spark Splitter'] },
      'Captain Boomerang': { ability: Abilities['Boomerang'] },
      'Professor Blood': { ability: Abilities['Poisoned Tip'] },
    },
    eyes: {
      'I See You': { stat: [{ attribute: Atr.critChc, modifier: '10%' }] },
      'Suspicious Figure': { stat: [{ attribute: Atr.mvSpd, modifier: '10%' }] },
      'Target Locked': { stat: [{ attrigute: Atr.attkDmg, modifier: '2' }] },
      'Cat Scratch': { stat: [{ attribute: Atr.attkDmg, modifier: '10' }] },
      'Arrrrgh!': { stat: [{ attribute: Atr.attkSpd, modifier: '10%' }] },
    },
    noses: {
      'Dew Drow Whiskers': {
        stat: [{ attribute: Atr.critChc, modifier: '5%' }],
        correction: 'Dew Drop Whiskers',
      },
      Ninja: { stat: [{ attribute: Atr.mvSpd, modifier: '5%' }] },
      'Dew Drop Fancy': { stat: [{ attribute: Atr.attkDmg, modifier: '1' }] },
      Bane: { stat: [{ attibute: Atr.health, modifier: '5' }] },
      'Dew Drop Mole': { stat: [{ attribute: Atr.attkSpd, modifier: '5%' }] },
    },
    clothes: {
      'Breast Guard': {
        stat: [
          {
            attibute: Atr.attkSpd,
            modifier: '10%',
          },
          {
            attribute: Atr.critChc,
            modifier: '10%',
          },
        ],
      },
      'Lefty Breast Guard': {
        stat: [
          {
            attribute: Atr.attkSpd,
            modifier: '10%',
          },
          {
            attribute: Atr.mvSpd,
            modifier: '10%',
          },
        ],
      },
      'Lonely Hunter': {
        stat: [
          {
            attribute: Atr.attkSpd,
            modifier: '10%',
          },
          {
            attribute: Atr.attkDmg,
            modifier: '2',
          },
        ],
      },
      'Leather Wrap': {
        stat: [
          {
            attribute: Atr.attkSpd,
            modifier: '10%',
          },
          {
            attribute: Atr.health,
            modifier: '10',
          },
        ],
      },
      'Front Guard': {
        stat: [
          {
            attribute: Atr.attkSpd,
            modifier: '20%',
          },
        ],
      },
    },
  },
  artillery: {
    baseStats: [
      { attribute: Atr.health, modifier: '60' },
      { attribute: Atr.attkDmg, modifier: '5 (Ranged)' },
      { attribute: Atr.attkSpd, modifier: '0.6' },
      { attribute: Atr.critChc, modifier: '10%' },
      { attribute: Atr.critDmg, modifier: '50%' },
      { attribute: Atr.mgkDmg, modifier: '0' },
      { attribute: Atr.mvSpd, modifier: '5' },
      { attribute: Atr.ddgChc, modifier: '25%' },
    ],
    legendary: {
      ability: Abilities['Aqua Protection'],
      stat: [
        { attribute: Atr.health, modifier: '60' },
        { attribute: Atr.attkDmg, modifier: '5 (Ranged)' },
        { attribute: Atr.attkSpd, modifier: '0.6' },
        { attribute: Atr.critChc, modifier: '10%' },
        { attribute: Atr.critDmg, modifier: '50%' },
        { attribute: Atr.mgkDmg, modifier: '0' },
        { attribute: Atr.mvSpd, modifier: '5' },
        { attribute: Atr.ddgChc, modifier: '25%' },
      ],
    },
    hats: {
      'Ambush Hunter': { ability: Abilities['Ambush'] },
      'Inferno High Noon': { ability: Abilities['Meteor Shower'] },
      'Hot Head': { ability: Abilities['Meteor Shower'] },
      'Cold Shoulders': { ability: Abilities['Ice Wall'] },
      'Cold Shot': { ability: Abilities['Hail Storm'] },
    },
    eyes: {
      Technician: { stat: [{ attribute: Atr.attkDmg, modifier: '2' }] },
      Angry: { stat: [{ attribute: Atr.mvSpd, modifier: '10%' }] },
      'Dead Shot': { stat: [{ attribute: Atr.attkSpd, modifier: '10%' }] },
      'Duel Accident': { stat: [{ attribute: Atr.critChc, modifier: '10%' }] },
      Sunglasses: { stat: [{ attribute: Atr.critDmg, modifier: '10%' }] },
    },
    noses: {
      'Long Whiskers': { stat: [{ attribute: Atr.attkDmg, modifier: '1' }] },
      'Love and War': { stat: [{ attribute: Atr.mvSpd, modifier: '5%' }] },
      Sniffer: { stat: [{ attribute: Atr.attkSpd, modifier: '5%' }] },
      'Mad Max': { stat: [{ attribute: Atr.critChc, modifier: '5%' }] },
      Mole: { stat: [{ attribute: Atr.critDmg, modifier: '10%' }] },
    },
    clothes: {
      Outlaw: { stat: [{ attribute: Atr.attkDmg, modifier: '4' }] },
      Bandito: { stat: [{ attribute: Atr.mvSpd, modifier: '20%' }] },
      Sheriff: { stat: [{ attribute: Atr.attkSpd, modifier: '20%' }] },
      Wanderer: { stat: [{ attribute: Atr.critChc, modifier: '20%' }] },
      Arsenal: { stat: [{ attribute: Atr.critDmg, modifier: '20%' }] },
    },
  },
  berserker: {
    baseStats: [
      { attribute: Atr.health, modifier: '100' },
      { attribute: Atr.attkDmg, modifier: '8 (Meelee)' },
      { attribute: Atr.attkSpd, modifier: '0.75' },
      { attribute: Atr.critChc, modifier: '0%' },
      { attribute: Atr.critDmg, modifier: '100%' },
      { attribute: Atr.mgkDmg, modifier: '0' },
      { attribute: Atr.mvSpd, modifier: '3.5' },
      { attribute: Atr.ddgChc, modifier: '0%' },
    ],
    legendary: {
      ability: Abilities['Aqua Protection'],
      stat: [
        { attribute: Atr.health, modifier: '100' },
        { attribute: Atr.attkDmg, modifier: '8 (Meelee)' },
        { attribute: Atr.attkSpd, modifier: '0.75' },
        { attribute: Atr.critChc, modifier: '0%' },
        { attribute: Atr.critDmg, modifier: '100%' },
        { attribute: Atr.mgkDmg, modifier: '0' },
        { attribute: Atr.mvSpd, modifier: '3.5' },
        { attribute: Atr.ddgChc, modifier: '0%' },
      ],
    },
    hats: {
      'Axe Head': { ability: Abilities['Berserk Axe'] },
      'Face Basher': { ability: Abilities['Brittle Ice Shield'] },
      'Cool Head': { ability: Abilities['Ice Tornado'] },
      'Ice Blasted': { ability: Abilities['Ice Path'] },
      'Ice Mohawk': { ability: Abilities['Berserk Axe'] },
    },
    eyes: {
      'Spiky Brows': { stat: [{ attribute: Atr.attkDmg, modifier: '2' }] },
      'Spiky Monobrow': {
        stat: [
          { attribute: Atr.attkDmg, modifier: '1' },
          { attribute: Atr.attkSpd, modifier: '5%' },
        ],
      },
      'Bear Ate it': {
        stat: [
          { attribute: Atr.health, modifier: '5' },
          { attribute: Atr.attkDmg, modifier: '1' },
        ],
      },
      'Bear Wrestling Accident': {
        stat: [
          { attribute: Atr.health, modifier: '5' },
          { attribute: Atr.attkSpd, modifier: '5%' },
        ],
      },
      Gotcha: { stat: [{ attribute: Atr.health, modifier: '10' }] },
    },
    noses: {
      'Rough Life': { stat: [{ attribute: Atr.attkDmg, modifier: '1' }] },
      'Wise Elder': { stat: [{ attribute: Atr.attkSpd, modifier: '5%' }] },
      'Ice Traveler': { stat: [{ attribute: Atr.mvSpd, modifier: '5%' }] },
      'Wild Caveman': { stat: [{ attribute: Atr.critChc, modifier: '5%' }] },
      Walrus: { stat: [{ attribute: Atr.health, modifier: '5' }] },
    },
    clothes: {
      'Bear Skin': { stat: [{ attribute: Atr.attkDmg, modifier: '4' }] },
      'Sculpted God': {
        stat: [
          { attribute: Atr.attkDmg, modifier: '10' },
          { attribute: Atr.attkSpd, modifier: '2%' },
        ],
      },
      Straps: {
        stat: [
          { attribute: Atr.attkDmg, modifier: '2' },
          { attribute: Atr.health, modifier: '10' },
        ],
      },
      'Nordic Metal': {
        stat: [
          { attribute: Atr.health, modifier: '10' },
          { attribute: Atr.attkSpd, modifier: '10' },
        ],
      },
      Stronger: { stat: [{ attribute: Atr.health, modifier: '20' }] },
    },
  },
  'dark knight': {
    baseStats: [
      { attribute: Atr.health, modifier: '90' },
      { attribute: Atr.attkDmg, modifier: '8 (Melee)' },
      { attribute: Atr.attkSpd, modifier: '1' },
      { attribute: Atr.critChc, modifier: '0%' },
      { attribute: Atr.critDmg, modifier: '100%' },
      { attribute: Atr.mgkDmg, modifier: '3' },
      { attribute: Atr.mvSpd, modifier: '3' },
      { attribute: Atr.ddgChc, modifier: '0%' },
    ],
    legendary: {
      ability: Abilities['Dark Swing'],
      stat: [
        { attribute: Atr.health, modifier: '90' },
        { attribute: Atr.attkDmg, modifier: '8 (Melee)' },
        { attribute: Atr.attkSpd, modifier: '1' },
        { attribute: Atr.critChc, modifier: '0%' },
        { attribute: Atr.critDmg, modifier: '100%' },
        { attribute: Atr.mgkDmg, modifier: '3' },
        { attribute: Atr.mvSpd, modifier: '3' },
        { attribute: Atr.ddgChc, modifier: '0%' },
      ],
    },
    hats: {
      'Flame Eater': { ability: Abilities['Demonic Siphon'] },
      'World Breaker': { ability: Abilities['Earthquake'] },
      Tempest: { ability: Abilities['Cyclone'] },
      Kraken: { ability: Abilities['Tsunami'] },
      'Venom Seeker': { ability: Abilities['Death Gaze'] },
    },
    // eyes: {},
    // noses: {},
    clothes: {
      Invulnerable: { stat: [{ attribute: Atr.health, modifier: '30' }] },
      'Roman God': { stat: [{ attribute: Atr.mgkDmg, modifier: '30%' }] },
      'Black Sun': { stat: [{ attribute: Atr.attkDmg, modifier: '6' }] },
      Rook: {
        stat: [
          { attribute: Atr.critChc, modifier: '15%' },
          { attribute: Atr.critDmg, modifier: '15%' },
        ],
      },
      'Black Sabbath': {
        stat: [
          { attribute: Atr.mvSpd, modifier: '15%' },
          { attribute: Atr.attkSpd, modifier: '15%' },
        ],
      },
    },
  },
  elemental: {
    baseStats: [
      { attribute: Atr.health, modifier: '80' },
      { attribute: Atr.attkDmg, modifier: '5 (Melee)' },
      { attribute: Atr.attkSpd, modifier: '0.8' },
      { attribute: Atr.critChc, modifier: '0%' },
      { attribute: Atr.critDmg, modifier: '50%' },
      { attribute: Atr.mgkDmg, modifier: '5' },
      { attribute: Atr.mvSpd, modifier: '3' },
      { attribute: Atr.ddgChc, modifier: '0%' },
    ],
    legendary: {
      ability: Abilities['Aqua Protection'],
      stat: [
        { attribute: Atr.health, modifier: '80' },
        { attribute: Atr.attkDmg, modifier: '5 (Melee)' },
        { attribute: Atr.attkSpd, modifier: '0.8' },
        { attribute: Atr.critChc, modifier: '0%' },
        { attribute: Atr.critDmg, modifier: '50%' },
        { attribute: Atr.mgkDmg, modifier: '5' },
        { attribute: Atr.mvSpd, modifier: '3' },
        { attribute: Atr.ddgChc, modifier: '0%' },
      ],
    },
    hats: {
      'Lighter Igniter': { ability: Abilities['Meteor Shower'] },
      Volcano: { ability: Abilities['Eruption'] },
      Geysers: { ability: Abilities['Fire Cloak'] },
      'Ram Horns': { ability: Abilities['Meteor Shower'] },
      'Betta Belava': { ability: Abilities['Path of Fire'] },
    },
    eyes: {
      'Burning Rights': { stat: [{ attribute: Atr.attkDmg, modifier: '2' }] },
      'Black Smith': {
        stat: [
          { attribute: Atr.attkDmg, modifier: '1' },
          { attribute: Atr.health, modifier: '5' },
        ],
      },
      Cyclops: { stat: [{ attribute: Atr.mgkDmg, modifier: '10%' }] },
      Demon: {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '5' },
          { attribute: Atr.health, modifier: '5' },
        ],
      },
      'Brutal Sight': { stat: [{ attribute: Atr.health, modifier: '10' }] },
    },
    noses: {
      'Sulfate Mask': { stat: [{ attribute: Atr.attkDmg, modifier: '1' }] },
      'Scary Grin': { stat: [{ attribute: Atr.health, modifier: '5' }] },
      Overbite: { stat: [{ attribute: Atr.mgkDmg, modifier: '5%' }] },
      'Blacksmith Grin': { stat: [{ attribute: Atr.cdn, modifier: '5%' }] },
      'Pebble Smile': { stat: [{ attribute: Atr.mvSpd, modifier: '5%' }] },
    },
    clothes: {
      Pangea: { stat: [{ attribute: Atr.health, modifier: '20' }] },
      Stalagmite: {
        stat: [
          { attribute: Atr.health, modifier: '10' },
          { attribute: Atr.mgkDmg, modifier: '10%' },
        ],
      },
      "Earth's Core": { stat: [{ attribute: Atr.mgkDmg, modifier: '20%' }] },
      Pitfall: {
        stat: [
          { attribute: Atr.attkDmg, modifier: '10' },
          { attribute: Atr.mgkDmg, modifier: '2%' },
        ],
      },
      'Magma Armor': { stat: [{ attribute: Atr.attkDmg, modifier: '4' }] },
    },
  },
  engineer: {
    baseStats: [
      { attribute: Atr.health, modifier: '60' },
      { attribute: Atr.attkDmg, modifier: '5 (Ranged)' },
      { attribute: Atr.attkSpd, modifier: '0.8' },
      { attribute: Atr.critChc, modifier: '5%' },
      { attribute: Atr.critDmg, modifier: '50%' },
      { attribute: Atr.mgkDmg, modifier: '0' },
      { attribute: Atr.mvSpd, modifier: '3' },
      { attribute: Atr.ddgChc, modifier: '0%' },
    ],
    legendary: {
      ability: Abilities['Aqua Protection'],
      stat: [
        { attribute: Atr.health, modifier: '60' },
        { attribute: Atr.attkDmg, modifier: '5 (Ranged)' },
        { attribute: Atr.attkSpd, modifier: '0.8' },
        { attribute: Atr.critChc, modifier: '5%' },
        { attribute: Atr.critDmg, modifier: '50%' },
        { attribute: Atr.mgkDmg, modifier: '0' },
        { attribute: Atr.mvSpd, modifier: '3' },
        { attribute: Atr.ddgChc, modifier: '0%' },
      ],
    },
    hats: {
      'Welder Helm': { ability: Abilities['Blinding Spark'] },
      'Death Ray Mount': { ability: Abilities['Death Ray'] },
      'Time To Stop': { ability: Abilities['Quick Dash'] },
      'Missle Launcher': { ability: Abilities['Meteor Shower'] },
      'Light Cannon': { ability: Abilities['Cyclone'] },
    },
    // eyes: {
    //     'Steel Man': { stat:[{attribute: , modifier: ''}] },
    //     'Parallellograms': { stat:[{attribute: , modifier: ''}] },
    //     'The Earth Stood Still': { stat:[{attribute: , modifier: ''}] },
    //     'Tetris': { stat:[{attribute: , modifier: ''}] },
    //     'I am Diggler': { stat:[{attribute: , modifier: ''}], correction:'I am Digger' },
    // },
    noses: {
      'Wire Whisker': { stat: [{ attribute: Atr.mgkDmg, modifier: '5%' }] },
      'Antenna Whisker': { stat: [{ attribute: Atr.cdn, modifier: '5%' }] },
      'Shock Whisker': { stat: [{ attribute: Atr.mvSpd, modifier: '5%' }] },
      Punk: { stat: [{ attribute: Atr.attkSpd, modifier: '5%' }] },
      'Crooked Smile': { stat: [{ attribute: Atr.health, modifier: '5' }] },
    },
    clothes: {
      'Crystal Heart': { stat: [{ attribute: Atr.mgkDmg, modifier: '20%' }] },
      Armor: {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '10%' },
          { attribute: Atr.cdn, modifier: '10%' },
        ],
      },
      'Iron Plate': {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '10%' },
          { attribute: Atr.health, modifier: '10' },
        ],
      },
      Segmented: {
        stat: [
          { attribute: Atr.health, modifier: '10' },
          { attribute: Atr.cdn, modifier: '10%' },
        ],
      },
      Buttons: { stat: [{ attribute: Atr.health, modifier: '20' }] },
    },
  },
  knight: {
    baseStats: [
      { attribute: Atr.health, modifier: '90' },
      { attribute: Atr.attkDmg, modifier: '8 (Melee)' },
      { attribute: Atr.attkSpd, modifier: '1' },
      { attribute: Atr.critChc, modifier: '2%' },
      { attribute: Atr.critDmg, modifier: '100%' },
      { attribute: Atr.mgkDmg, modifier: '0' },
      { attribute: Atr.mvSpd, modifier: '3' },
      { attribute: Atr.ddgChc, modifier: '10%' },
    ],
    legendary: {
      ability: Abilities['Aqua Protection'],
      stat: [
        { attribute: Atr.health, modifier: '90' },
        { attribute: Atr.attkDmg, modifier: '8 (Melee)' },
        { attribute: Atr.attkSpd, modifier: '1' },
        { attribute: Atr.critChc, modifier: '2%' },
        { attribute: Atr.critDmg, modifier: '100%' },
        { attribute: Atr.mgkDmg, modifier: '0' },
        { attribute: Atr.mvSpd, modifier: '3' },
        { attribute: Atr.ddgChc, modifier: '10%' },
      ],
    },
    hats: {
      'Strong Arm': { ability: Abilities['Rock Throw'] },
      'The Vanguard': { ability: Abilities['Vanguard'] },
      'Thorny Cap': { ability: Abilities['Thorn Shield'] },
      'Chains Helm': { ability: Abilities['Aqua Protection'] },
      'Giant King': { ability: Abilities['Gigantum'] },
    },
    eyes: {
      Squint: { stat: [{ attribute: Atr.attkDmg, modifier: '2' }] },
      'Galant Visor': { stat: [{ attribute: Atr.health, modifier: '10' }] },
      'Seasoned Veteran': { stat: [{ attribute: Atr.attkSpd, modifier: '10%' }] },
      'Friendly Brows': { stat: [{ attribute: Atr.critChc, modifier: '10%' }] },
      Monobrows: { stat: [{ attribute: Atr.critDmg, modifier: '10%' }] },
    },
    noses: {
      'Big Mustache': { stat: [{ attribute: Atr.attkDmg, modifier: '1' }] },
      'Friendly Mustache': { stat: [{ attribute: Atr.health, modifier: '5' }] },
      'Wise Beard': { stat: [{ attribute: Atr.attkSpd, modifier: '5%' }] },
      'Flaunting Facial Folicles': { stat: [{ attribute: Atr.critChc, modifier: '5%' }] },
      'Seasoned Beard': { stat: [{ attribute: Atr.critDmg, modifier: '5%' }] },
    },
    clothes: {
      'Light Muscle Armor': { stat: [{ attribute: Atr.health, modifier: '20' }] },
      'Round Guard': { stat: [{ attribute: Atr.attkDmg, modifier: '4' }] },
      'Curved Guard': {
        stat: [
          { attribute: Atr.health, modifier: '10' },
          { attribute: Atr.attkDmg, modifier: '2' },
        ],
      },
      'Holy Chainmail': {
        stat: [
          { attribute: Atr.health, modifier: '10' },
          { attribute: Atr.attkSpd, modifier: '10%' },
        ],
      },
      'Abs Guard': {
        stat: [
          { attribute: Atr.health, modifier: '10' },
          { attribute: Atr.critDmg, modifier: '10%' },
        ],
      },
    },
  },
  magitek: {
    baseStats: [
      { attribute: Atr.health, modifier: '80' },
      { attribute: Atr.attkDmg, modifier: '5 (Ranged)' },
      { attribute: Atr.attkSpd, modifier: '0.8' },
      { attribute: Atr.critChc, modifier: '0%' },
      { attribute: Atr.critDmg, modifier: '50%' },
      { attribute: Atr.mgkDmg, modifier: '5' },
      { attribute: Atr.mvSpd, modifier: '3' },
      { attribute: Atr.ddgChc, modifier: '0%' },
    ],
    legendary: {
      ability: Abilities['Aqua Protection'],
      stat: [
        { attribute: Atr.health, modifier: '80' },
        { attribute: Atr.attkDmg, modifier: '5 (Ranged)' },
        { attribute: Atr.attkSpd, modifier: '0.8' },
        { attribute: Atr.critChc, modifier: '0%' },
        { attribute: Atr.critDmg, modifier: '50%' },
        { attribute: Atr.mgkDmg, modifier: '5' },
        { attribute: Atr.mvSpd, modifier: '3' },
        { attribute: Atr.ddgChc, modifier: '0%' },
      ],
    },
    hats: {
      'Stomping Horns': { ability: Abilities['Giant Stomp'] },
      Overloaded: { ability: Abilities['Electric Discharge'] },
      Freezer: { ability: Abilities['Winter'] },
      'Hydro Pump': { ability: Abilities['Tsunami'] },
      'Flame Thrower': { ability: Abilities['Fire Barrage'] },
    },
    eyes: {
      'Radio Eyes': { stat: [{ attribute: Atr.mgkDmg, modifier: '10%' }] },
      'Laser Focus': { stat: [{ attribute: Atr.health, modifier: '10' }] },
      'Blacksmith Furnace': { stat: [{ attribute: Atr.cdn, modifier: '10%' }] },
      'Crystal Vision': {
        stat: [
          { attribute: Atr.health, modifier: '5' },
          { attribute: Atr.mgkDmg, modifier: '5%' },
        ],
      },
      'Corruption Infection': {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '5%' },
          { attribute: Atr.cdn, modifier: '5%' },
        ],
      },
    },
    noses: {
      'Radio Select': { stat: [{ attribute: Atr.mgkDmg, modifier: '5%' }] },
      'Iron Nose': { stat: [{ attribute: Atr.health, modifier: '5' }] },
      'Shock Sniffer': { stat: [{ attribute: Atr.cdn, modifier: '5%' }] },
      Crystalstache: { stat: [{ attribute: Atr.mvSpd, modifier: '5%' }] },
      'Optic Fiber': { stat: [{ attribute: Atr.attkSpd, modifier: '5%' }] },
    },
    clothes: {
      'Inner Crystal': { stat: [{ attribute: Atr.mgkDmg, modifier: '20%' }] },
      'Corruption Furnace': {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '10%' },
          { attribute: Atr.health, modifier: '10' },
        ],
      },
      Impaled: {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '10%' },
          { attribute: Atr.cdn, modifier: '10%' },
        ],
      },
      'Star Goo': {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '10%' },
          { attribute: Atr.attkSpd, modifier: '10%' },
        ],
      },
      'Crystal Infection': {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '10%' },
          { attribute: Atr.mvSpd, modifier: '10%' },
        ],
      },
    },
  },
  musketeer: {
    baseStats: [
      { attribute: Atr.health, modifier: '60' },
      { attribute: Atr.attkDmg, modifier: '3 (Melee)' },
      { attribute: Atr.attkSpd, modifier: '0.55' },
      { attribute: Atr.critChc, modifier: '20%' },
      { attribute: Atr.critDmg, modifier: '150%' },
      { attribute: Atr.mgkDmg, modifier: '0' },
      { attribute: Atr.mvSpd, modifier: '4' },
      { attribute: Atr.ddgChc, modifier: '30%' },
    ],
    legendary: {
      ability: Abilities['Aqua Protection'],
      stat: [
        { attribute: Atr.health, modifier: '60' },
        { attribute: Atr.attkDmg, modifier: '3 (Melee)' },
        { attribute: Atr.attkSpd, modifier: '0.55' },
        { attribute: Atr.critChc, modifier: '20%' },
        { attribute: Atr.critDmg, modifier: '150%' },
        { attribute: Atr.mgkDmg, modifier: '0' },
        { attribute: Atr.mvSpd, modifier: '4' },
        { attribute: Atr.ddgChc, modifier: '30%' },
      ],
    },
    hats: {
      Speedster: { ability: Abilities['Quick Dash'] },
      Blonde: { ability: Abilities['Aqua Protection'] },
      'Feather Cap': { ability: Abilities['Quick Dash'] },
      'Wind Blown': { ability: Abilities['Cyclone'] },
      'Feather Hunter': { ability: Abilities['Hail of Blades'] },
    },
    eyes: {
      'Curly Brows': { stat: [{ attribute: Atr.attkSpd, modifier: '10%' }] },
      Emotions: { stat: [{ attribute: Atr.mvSpd, modifier: '10%' }] },
      Hmm: {
        stat: [
          { attribute: Atr.critChc, modifier: '5%' },
          { attribute: Atr.critDmg, modifier: '5%' },
        ],
      },
      'Sculpted Brows': { stat: [{ attribute: Atr.critDmg, modifier: '10%' }] },
      'Curly Monobrow': { stat: [{ attribute: Atr.critChc, modifier: '10%' }] },
    },
    noses: {
      'Curly Stache': { stat: [{ attribute: Atr.attkSpd, modifier: '5%' }] },
      Shaven: { stat: [{ attribute: Atr.mvSpd, modifier: '5%' }] },
      'Fancy Stache': { stat: [{ attribute: Atr.attkDmg, modifier: '1' }] },
      'Hoho!': { stat: [{ attribute: Atr.critDmg, modifier: '5%' }] },
      Romantic: { stat: [{ attribute: Atr.critChc, modifier: '5%' }] },
    },
    clothes: {
      Fancy: { stat: [{ attribute: Atr.attkSpd, modifier: '20%' }] },
      Manly: { stat: [{ attribute: Atr.mvSpd, modifier: '20%' }] },
      Tux: {
        stat: [
          { attribute: Atr.critChc, modifier: '10%' },
          { attribute: Atr.critDmg, modifier: '10%' },
        ],
      },
      'Coat Off': { stat: [{ attribute: Atr.critDmg, modifier: '20%' }] },
      'Chest Hair': { stat: [{ attribute: Atr.critChc, modifier: '20%' }] },
    },
  },
  'plague doctor': {
    baseStats: [
      { attribute: Atr.health, modifier: '50' },
      { attribute: Atr.attkDmg, modifier: '5 (Melee)' },
      { attribute: Atr.attkSpd, modifier: '0.8' },
      { attribute: Atr.critChc, modifier: '20%' },
      { attribute: Atr.critDmg, modifier: '150%' },
      { attribute: Atr.mgkDmg, modifier: '0%' },
      { attribute: Atr.mvSpd, modifier: '3' },
      { attribute: Atr.ddgChc, modifier: '0%' },
    ],
    legendary: {
      ability: Abilities['Aqua Protection'],
      stat: [
        { attribute: Atr.health, modifier: '50' },
        { attribute: Atr.attkDmg, modifier: '5 (Melee)' },
        { attribute: Atr.attkSpd, modifier: '0.8' },
        { attribute: Atr.critChc, modifier: '20%' },
        { attribute: Atr.critDmg, modifier: '150%' },
        { attribute: Atr.mgkDmg, modifier: '0%' },
        { attribute: Atr.mvSpd, modifier: '3' },
        { attribute: Atr.ddgChc, modifier: '0%' },
      ],
    },
    hats: {
      Vats: { ability: Abilities['Toxic Gas'] },
      Infusion: { ability: Abilities['Blood Lust'] },
      Spew: { ability: Abilities['Miasma'] },
      'St Bernard': { ability: Abilities['Aqua Protection'] },
      'Thorn Crown': { ability: Abilities['Meteor Shower'] },
    },
    eyes: {
      Spectacles: { stat: [{ attribute: Atr.attkDmg, modifier: '2' }] },
      Hallowed: {
        stat: [
          { attribute: Atr.attkDmg, modifier: '1' },
          { attribute: Atr.health, modifier: '10' },
        ],
      },
      Hidden: { stat: [{ attribute: Atr.mvSpd, modifier: '10' }] },
      Wrath: {
        stat: [
          { attribute: Atr.attkDmg, modifier: '1' },
          { attribute: Atr.mvSpd, modifier: '5' },
        ],
      },
      Blind: { stat: [{ attribute: Atr.health, modifier: '10' }] },
    },
    // noses: {
    //     'Medium': { stat:[{attribute: , modifier: ''}] },
    //     'Feeder': { stat:[{attribute: , modifier: ''}] },
    //     'Duck': { stat:[{attribute: , modifier: ''}] },
    //     'Hawk': { stat:[{attribute: , modifier: ''}] },
    //     'Snuff': { stat:[{attribute: , modifier: ''}] },
    // },
    clothes: {
      Ready: { stat: [{ attribute: Atr.attkDmg, modifier: '4' }] },
      Cloak: {
        stat: [
          { attribute: Atr.attkDmg, modifier: '2' },
          { attribute: Atr.health, modifier: '20' },
        ],
      },
      'Utility Belt': { stat: [{ attribute: Atr.mvSpd, modifier: '20' }] },
      Butcher: {
        stat: [
          { attribute: Atr.attkDmg, modifier: '2' },
          { attribute: Atr.mvSpd, modifier: '10' },
        ],
      },
      Recovering: { stat: [{ attribute: Atr.health, modifier: '20' }] },
    },
  },
  vicar: {
    baseStats: [
      { attribute: Atr.health, modifier: '50' },
      { attribute: Atr.attkDmg, modifier: '0 (Ranged)' },
      { attribute: Atr.attkSpd, modifier: '1' },
      { attribute: Atr.critChc, modifier: '0%' },
      { attribute: Atr.critDmg, modifier: '50%' },
      { attribute: Atr.mgkDmg, modifier: '8' },
      { attribute: Atr.mvSpd, modifier: '3' },
      { attribute: Atr.ddgChc, modifier: '0%' },
    ],
    legendary: {
      ability: Abilities['Aqua Protection'],
      stat: [
        { attribute: Atr.health, modifier: '50' },
        { attribute: Atr.attkDmg, modifier: '0 (Ranged)' },
        { attribute: Atr.attkSpd, modifier: '1' },
        { attribute: Atr.critChc, modifier: '0%' },
        { attribute: Atr.critDmg, modifier: '50%' },
        { attribute: Atr.mgkDmg, modifier: '8' },
        { attribute: Atr.mvSpd, modifier: '3' },
        { attribute: Atr.ddgChc, modifier: '0%' },
      ],
    },
    hats: {
      'Divine Help': { ability: Abilities['Healing Call'] },
      'Cherub Trumpet': { ability: Abilities['Battle Cry'] },
      'Holy Protection': { ability: Abilities['Aqua Protection'] },
      'Spark Halo': { ability: Abilities['Aqua Protection'] },
      'Blasphemous Crown': { ability: Abilities['Aqua Protection'] },
    },
    eyes: {
      Look: { stat: [{ attribute: Atr.health, modifier: '10' }] },
      Unphased: {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '5%' },
          { attribute: Atr.health, modifier: '5' },
        ],
      },
      Justice: { stat: [{ attribute: Atr.mgkDmg, modifier: '10%' }] },
      Happy: {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '5%' },
          { attribute: Atr.cdn, modifier: '5%' },
        ],
      },
      Jest: { stat: [{ attribute: Atr.cdn, modifier: '10%' }] },
    },
    noses: {
      Whiskers: { stat: [{ attribute: Atr.health, modifier: '5' }] },
      Cute: { stat: [{ attribute: Atr.mvSpd, modifier: '5%' }] },
      Love: { stat: [{ attribute: Atr.mgkDmg, modifier: '5%' }] },
      Sniffers: { stat: [{ attribute: Atr.attkSpd, modifier: '5%' }] },
      Surprised: { stat: [{ attribute: Atr.cdn, modifier: '5%' }] },
    },
    clothes: {
      Pure: { stat: [{ attribute: Atr.health, modifier: '15' }] },
      Stole: { stat: [{ attribute: Atr.attkDmg, modifier: '15' }] },
      Monk: { stat: [{ attribute: Atr.mgkDmg, modifier: '15%' }] },
      'Holy Cross': { stat: [{ attribute: Atr.mvSpd, modifier: '15%' }] },
      Friar: { stat: [{ attribute: Atr.attkSpd, modifier: '15%' }] },
    },
  },
  wizard: {
    baseStats: [
      { attribute: Atr.health, modifier: '60' },
      { attribute: Atr.attkDmg, modifier: '0 (Ranged)' },
      { attribute: Atr.attkSpd, modifier: '1' },
      { attribute: Atr.critChc, modifier: '0%' },
      { attribute: Atr.critDmg, modifier: '50%' },
      { attribute: Atr.mgkDmg, modifier: '8' },
      { attribute: Atr.mvSpd, modifier: '3' },
      { attribute: Atr.ddgChc, modifier: '5%' },
    ],
    legendary: {
      ability: Abilities['Aqua Protection'],
      stat: [
        { attribute: Atr.health, modifier: '60' },
        { attribute: Atr.attkDmg, modifier: '0 (Ranged)' },
        { attribute: Atr.attkSpd, modifier: '1' },
        { attribute: Atr.critChc, modifier: '0%' },
        { attribute: Atr.critDmg, modifier: '50%' },
        { attribute: Atr.mgkDmg, modifier: '8' },
        { attribute: Atr.mvSpd, modifier: '3' },
        { attribute: Atr.ddgChc, modifier: '5%' },
      ],
    },
    hats: {
      'Meteor Summoner': { ability: Abilities['Meteor Shower'] },
      'Ice Witch': { ability: Abilities['Hail Storm'] },
      Technomagus: { ability: Abilities['Quick Dash'] },
      'Cyclone Top Hat': { ability: Abilities['Cyclone'] },
      Mermaid: { ability: Abilities['Aqua Protection'] },
    },
    eyes: {
      'Neo Glasses': { stat: [{ attribute: Atr.cdn, modifier: '10%' }] },
      Nerdy: { stat: [{ attribute: Atr.attkDmg, modifier: '2' }] },
      Dizzy: { stat: [{ attribute: Atr.health, modifier: '10' }] },
      Cool: { stat: [{ attribute: Atr.mvSpd, modifier: '10%' }] },
      Awesome: { stat: [{ attribute: Atr.mgkDmg, modifier: '10%' }] },
    },
    noses: {
      'Button Nose': { stat: [{ attribute: Atr.cdn, modifier: '5%' }] },
      'Purple Mole': { stat: [{ attribute: Atr.attkDmg, modifier: '1' }] },
      'Band Aid': { stat: [{ attribute: Atr.health, modifier: '5' }] },
      'Truffle Seeker': { stat: [{ attribute: Atr.mvSpd, modifier: '5%' }] },
      Sniffles: { stat: [{ attribute: Atr.mgkDmg, modifier: '5%' }] },
    },
    clothes: {
      Scholar: {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '10%' },
          { attribute: Atr.cdn, modifier: '10%' },
        ],
      },
      'Magic School': {
        stat: [
          { attribute: Atr.attkDmg, modifier: '2' },
          { attribute: Atr.mgkDmg, modifier: '10%' },
        ],
      },
      Battlemage: {
        stat: [
          { attribute: Atr.health, modifier: '10' },
          { attribute: Atr.mgkDmg, modifier: '10%' },
        ],
      },
      'Jester Garb': {
        stat: [
          { attribute: Atr.mgkDmg, modifier: '10%' },
          { attribute: Atr.mvSpd, modifier: '10%' },
        ],
      },
      'Dreamy Wizard': { stat: [{ attribute: Atr.mgkDmg, modifier: '20%' }] },
    },
  },
};

export default Parts;
