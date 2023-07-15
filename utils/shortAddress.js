export const shortAddress = (address, start, end) => {
  if (address !== undefined) {
    return `${address?.substring(0, start)}...${address?.substring(address.length - end)}`;
  }
};
