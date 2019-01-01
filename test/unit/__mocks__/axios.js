const mockData = {
  data: [
    {
      "id": "926425b3-1bc4-40f6-926c-b5da55dbdc44",
      "user": {
        "name": "Limin",
        "surname": "Chen"
      },
      "amountInUsd": "2000",
      "currency": "CAD",
      "time": 1546226539580,
      "updatedTime": 1546226539580
    }
  ],
  headers: {
    'x-total-count': 1
  }
}

const mock = {
  get: jest.fn(() => Promise.resolve(mockData)),
  post: jest.fn(() => Promise.resolve({
    data: mockData.data[0]
  })),
  put: jest.fn(() => Promise.resolve({
    data: mockData.data[0]
  })),
  delete: jest.fn(() => Promise.resolve({}))
}

export default mock