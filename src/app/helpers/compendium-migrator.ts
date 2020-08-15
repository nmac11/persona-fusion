import { Skill } from '../models/skill';
import { Persona } from '../models/persona';

interface CompressedData {
  [key: string]: {
    skills: { [key: string]: number };
    aff: string;
    inh: string;
    lvl: number;
    arc: string;
  };
}

export function compendiumMigrator(
  compressedData: CompressedData,
  skillData: Skill[],
  arcanaData: string[],
): Persona[] {
  const start = Date.now();
  const res = Object.entries(compressedData).map(([name, data]) => {
    const { skills, aff, inh, arc, lvl, ...miscData } = data;
    const persona: any = {};
    persona.name = name;
    persona.level = data.lvl;
    persona.arcana = arcanaData.indexOf(data.arc);
    persona.arcanaName = data.arc;
    persona.affinities = data.aff;
    persona.inherits = data.inh;
    persona.skills = Object.entries(data.skills).map(([name, level]) => {
      const skill = skillData.find((s) => s.name === name);
      return { ...skill, level };
    });
    return Object.assign(persona, miscData);
  });
  console.log('completed in ' + (Date.now() - start) + 'ms')
  return res;
}
