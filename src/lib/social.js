export const SOCIAL = {
  email: "navadeepnaidu7@protonmail.com",
  name: "Navadeep Naidu",
  github: "https://github.com/navadeepnaidu7",
  githubUsername: "navadeepnaidu7",
  linkedin: "https://linkedin.com/in/navadeepnaidu",
  linkedinHeadline: "Backend & DevOps Engineer",
  linkedinLocation: "Hyderabad, India",
  twitter: "https://x.com/Navadeep_naidu7",
  twitterHandle: "@Navadeep_naidu7",
  twitterBio: "Building scalable backends & DevOps workflows",
  medium: "https://medium.com/@navadeepnaidu7",
  mediumHandle: "@navadeepnaidu7",
};

const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";

/**
 * @typedef {{ date: string; count: number; level: 0|1|2|3|4 }} ContributionDay
 * @typedef {{ total: number; start: string; levels: string; counts: number[] }} Contributions
 */

/** @type {Map<string, Promise<Contributions>>} */
const cache = new Map();

/** @param {string} username */
export function getGithubContributions(username) {
  let promise = cache.get(username);
  if (!promise) {
    promise = fetchContributions(username);
    cache.set(username, promise);
  }
  return promise;
}

/** @param {string} username */
async function fetchContributions(username) {
  const response = await fetch(`${CONTRIBUTIONS_API}/${username}?y=last`);
  if (!response.ok) throw new Error(`contributions responded with ${response.status}`);

  /** @type {{ total: Record<string, number>; contributions: ContributionDay[] }} */
  const data = await response.json();
  const days = data.contributions ?? [];

  return {
    total: data.total?.lastYear ?? 0,
    start: days[0]?.date ?? "",
    levels: days.map((day) => day.level).join(""),
    counts: days.map((day) => day.count),
  };
}

/**
 * @param {Contributions} contributions
 * @returns {(ContributionDay | undefined)[][]}
 */
export function toWeeks({ start, levels, counts }) {
  const startDate = new Date(`${start}T00:00:00Z`);
  /** @type {(ContributionDay | undefined)[][]} */
  const weeks = [];
  /** @type {(ContributionDay | undefined)[]} */
  let week = Array.from({ length: startDate.getUTCDay() });

  for (const [index, count] of counts.entries()) {
    const date = new Date(startDate);
    date.setUTCDate(date.getUTCDate() + index);
    week.push({
      date: date.toISOString().slice(0, 10),
      count,
      level: Number(levels[index] ?? 0),
    });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    weeks.push([...week, ...Array.from({ length: 7 - week.length })]);
  }

  return weeks;
}
