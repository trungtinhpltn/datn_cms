export function cleanProjectData<T extends Partial<GetProjectByIdResponse>>(
  modifiedData: T
) {
  const data: T = { ...modifiedData }
  // clean data
  if (modifiedData.name) {
    data.name = modifiedData.name.replace(/\s+/g, ' ').trim()
  }
  if (modifiedData.categories) {
    data.categories = modifiedData.categories
      .map((name) => name.replace(/\s+/g, ' ').trim())
      .filter((name) => !!name)
  }
  return data
}
