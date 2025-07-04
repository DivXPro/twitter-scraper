import { Profile } from './profile'
import { getScraper } from './test-utils'

test('scraper can get profile', async () => {
  const expected: Profile = {
    avatar:
      'https://pbs.twimg.com/profile_images/436075027193004032/XlDa2oaz.jpeg',
    banner: 'https://pbs.twimg.com/profile_banners/106037940/1541084318',
    biography: 'nothing',
    isPrivate: false,
    isVerified: undefined,
    isBlueVerified: false,
    joined: new Date(Date.UTC(2010, 0, 18, 8, 49, 30, 0)),
    location: 'Ukraine',
    name: 'Nomadic',
    pinnedTweetIds: [],
    url: 'https://x.com/nomadic_ua',
    userId: '106037940',
    username: 'nomadic_ua',
    website: 'https://nomadic.name',
  }

  const scraper = await getScraper()

  const actual = await scraper.getProfile('nomadic_ua')
  expect(actual.avatar).toEqual(expected.avatar)
  expect(actual.banner).toEqual(expected.banner)
  expect(actual.biography).toEqual(expected.biography)
  expect(actual.isPrivate).toEqual(expected.isPrivate)
  expect(actual.isVerified).toEqual(expected.isVerified)
  expect(actual.isBlueVerified).toEqual(expected.isBlueVerified)
  expect(actual.joined).toEqual(expected.joined)
  expect(actual.location).toEqual(expected.location)
  expect(actual.name).toEqual(expected.name)
  expect(actual.pinnedTweetIds).toEqual(expected.pinnedTweetIds)
  expect(actual.url).toEqual(expected.url)
  expect(actual.userId).toEqual(expected.userId)
  expect(actual.username).toEqual(expected.username)
  expect(actual.website).toEqual(expected.website)
})

test('scraper can get partial private profile', async () => {
  const expected: Profile = {
    avatar:
      'https://pbs.twimg.com/profile_images/1612213936082030594/_HEsjv7Q.jpg',
    banner:
      'https://pbs.twimg.com/profile_banners/1221221876849995777/1673110776',
    biography: `t h e h e r m i t`,
    isPrivate: true,
    isVerified: false,
    joined: new Date(Date.UTC(2020, 0, 26, 0, 3, 5, 0)),
    location: 'sometimes',
    name: 'private account',
    pinnedTweetIds: [],
    url: 'https://x.com/tomdumont',
    userId: '1221221876849995777',
    username: 'tomdumont',
    website: undefined,
  }

  const scraper = await getScraper()

  const actual = await scraper.getProfile('tomdumont')
  expect(actual.avatar).toEqual(expected.avatar)
  expect(actual.banner).toEqual(expected.banner)
  expect(actual.biography).toEqual(expected.biography)
  expect(actual.isPrivate).toEqual(expected.isPrivate)
  expect(actual.isVerified).toEqual(expected.isVerified)
  expect(actual.joined).toEqual(expected.joined)
  expect(actual.location).toEqual(expected.location)
  expect(actual.name).toEqual(expected.name)
  expect(actual.pinnedTweetIds).toEqual(expected.pinnedTweetIds)
  expect(actual.url).toEqual(expected.url)
  expect(actual.userId).toEqual(expected.userId)
  expect(actual.username).toEqual(expected.username)
  expect(actual.website).toEqual(expected.website)
})

test('scraper cannot get suspended profile', async () => {
  const scraper = await getScraper()
  // taken from https://en.wikipedia.org/wiki/Twitter_suspensions#List_of_notable_suspensions
  expect(scraper.getProfile('RobertC20041800')).rejects.toThrow()
})

test('scraper cannot get not found profile', async () => {
  const scraper = await getScraper()
  expect(scraper.getProfile('sample3123131')).rejects.toThrow()
})

test('scraper can get profile by screen name', async () => {
  const scraper = await getScraper()
  await scraper.getProfile('GeminiApp')
})
