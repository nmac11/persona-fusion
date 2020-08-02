import { Persona } from '../models/persona';
import { FusionNode } from '../models/fusion-node';

export function countSkillPicks(
  persona: Persona,
  fusionItems: FusionNode[],
): number {
  const maxInheritedSkills =
    8 - persona.skills.filter((s) => s.level === 0).length;
  const totalFusionSkills = fusionItems.reduce((total, item) => {
    total += item.skills.slice(0, 8).length;
    return total;
  }, 0);
  // Not possible to inherit exactly 7 skills based on the chart
  const chart = [0, 6, 9, 12, 24, 32, 42, 42, 99];
  const totalInheritedSkills = chart.indexOf(
    chart.find((n) => totalFusionSkills < n),
  );
  return totalInheritedSkills <= maxInheritedSkills
    ? totalInheritedSkills
    : maxInheritedSkills;
}
