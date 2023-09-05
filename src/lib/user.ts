import { teams } from '@/lib/appwrite';

export async function getTeams() {
  const data = await teams.list();
  return {
    teams: data.teams
  }
}