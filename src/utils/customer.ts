export function cleanCustomerData<T extends Partial<ICustomer>>(
  modifiedData: T
) {
  const data: T = { ...modifiedData }
  // clean data
  if (modifiedData.name) {
    data.name = modifiedData.name.replace(/\s+/g, ' ').trim()
  }
  if (modifiedData.accountManagement) {
    data.accountManagement = modifiedData.accountManagement
      .replace(/\s+/g, ' ')
      .trim()
  }
  if (modifiedData.email) {
    data.email = modifiedData.email.replace(/\s+/g, ' ').trim()
  }
  if (modifiedData.socials) {
    data.socials = modifiedData.socials
      .map((name) => name.replace(/\s+/g, ' ').trim())
      .filter((name) => !!name)
  }
  return data
}
