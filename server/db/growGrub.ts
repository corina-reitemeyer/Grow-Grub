import type { User, UserData, Plant, GardenDB } from '../../models/growGrub.ts'
import db from './connection.ts'
import type { PlotDatum } from '../../models/growGrub.ts'

export function getUserByAuth0Id(auth0Id: string): Promise<User> {
  return db('users')
    .where({ auth0_id: auth0Id })
    .first('id', 'username', 'location')
}

interface getUsernameProps {
  username: string
}
export function getUsernames(): Promise<getUsernameProps[]> {
  return db('users').select('username')
}

export function getPlants(): Promise<Plant[]> {
  return db('plants').select()
}

export function getUsersPlantsDesired(auth0Id: string): Promise<Plant[]> {
  return db('users')
    .where('users.auth0_id', auth0Id)
    .join('user_desired_plants', 'user_desired_plants.user_id', 'users.id')
    .join('plants', 'plants.id', 'user_desired_plants.plant_id')
    .select('plants.*')
}

export function getUsersGardens(auth0Id: string) {
  return db('users')
    .where('users.auth0_id', auth0Id)
    .join('gardens', 'gardens.user_id', 'users.id')
    .select('gardens.*')
}

export const getAllUsersPlots = (auth0Id: string) => {
  return db('users')
    .where('users.auth0_id', auth0Id)
    .join('gardens', 'gardens.user_id', 'users.id')
    .join('plots', 'plots.garden_id', 'gardens.id')
    .select(
      'garden_id as gardenId',
      'plots.name',
      'plot_number as plotNumber',
      'size',
      'plot_type as blockType',
      'rain_exposure as rainExposure',
      'sun_level as sunLight',
      'growable',
    )
}

export function getUserGarden(
  auth0Id: string,
  id: number,
): Promise<GardenDB[]> {
  return db('users')
    .where('users.auth0_id', auth0Id)
    .andWhere('gardens.id', id)
    .join('gardens', 'gardens.user_id', 'users.id')
    .join('plots', 'plots.garden_id', 'gardens.id')
    .join('plots_plants', 'plots_plants.plot_id', 'plots.id')
    .join('plants', 'plants.id', 'plots_plants.plant_id')
    .select(
      'gardens.*',
      'plots.*',
      'plots.name as plot_name',
      'plots_plants.*',
      'plots_plants.id as plot_plant_id',
      'plants.*',
      'plants.name as plant_name',
    )
}

export function saveNewGarden(
  layout: string,
  userID: number,
): Promise<number[]> {
  const newGarden = {
    user_id: userID,
    layout: layout,
  }
  return db('gardens').insert(newGarden)
}

// Size mismatch + add growable
export function saveNewPlots(
  blockData: PlotDatum[],
  gardenID: number,
): Promise<number[]> {
  const plotsToInsert = blockData.map((plot) => ({
    garden_id: gardenID,
    plot_number: plot.plotNumber,
    sun_level: plot.sunLight,
    plot_type: plot.blockType,
    size: plot.size,
    name: plot.name,
    rain_exposure: plot.rainExposure,
    growable: plot.growable,
  }))
  return db('plots').insert(plotsToInsert).returning(['id'])
}

export async function addVege(prompResult) {
  const promptData = {
    plantName: prompResult.plantCareData[0].plantName,
    scientificName: prompResult.plantCareData[0].scientificName,
    description: prompResult.plantCareData[0].description,
    soil: prompResult.plantCareData[0].careInstructions.soil,
    sunlight: prompResult.plantCareData[0].careInstructions.sunlight,
    watering: prompResult.plantCareData[0].careInstructions.watering,
    fertilization: prompResult.plantCareData[0].careInstructions.fertilization,
    pruning: prompResult.plantCareData[0].careInstructions.pruning,
    pests: prompResult.plantCareData[0].careInstructions.pests,
    diseases: prompResult.plantCareData[0].careInstructions.diseases,
    indoorsPlantingTime:
      prompResult.plantCareData[0].plantingTime.indoorsPlantingTime,
    outdoorsPlantingTime:
      prompResult.plantCareData[0].plantingTime.outdoorsPlantingTime,
    spacing: prompResult.plantCareData[0].plantingTime.spacing,
    plantingTime: prompResult.plantCareData[0].plantingTime.plantingTime,
    havestingTime: prompResult.plantCareData[0].harvesting.harvestingTime,
    harvestingTips: prompResult.plantCareData[0].harvesting.harvestingTips,
  }
  console.log(prompResult.plantCareData[0].harvesting.harvestingTime)
  return db('plant_care_data').insert(promptData)
}

interface NewUserData extends UserData {
  plants: string[]
  auth0_id: string
}
export async function addUser({username, location, plants, summerStarts, auth0_id}: NewUserData) {
  try {
    await db.transaction(async (trx) => {
      const [user] = await trx('users').insert({username, location, auth0_id, summer_start_month: summerStarts}, ['id'])
      const userId = user.id
      const knownPlants = await trx('plants').whereIn('name', plants)
      const desiredPlantsData = knownPlants.map(plant => ({plant_id:plant.id, user_id: userId}))
      await trx('user_desired_plants').insert(desiredPlantsData)

      console.log(`added user ${userId}: ${username}`)
    })
  } catch (error) {
    console.log(error)
    throw new Error (`Couldn't add user`)
  }
}