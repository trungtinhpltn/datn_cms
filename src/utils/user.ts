export function cleanUserData<T extends Partial<IUser>>(modifiedData: T) {
  const data: T = { ...modifiedData }
  // clean data
  if (modifiedData.name) {
    data.name = modifiedData.name.replace(/\s+/g, ' ').trim()
  }
  if (modifiedData.email) {
    data.email = modifiedData.email.replace(/\s+/g, ' ').trim()
  }
  return data
}
