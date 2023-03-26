export default interface User {
    Id: number
    Name: string
    ServerId: number
    LastLoginDate: Date
    LastActivityDate: Date
    Policy: Policy
}

interface Policy {
    IsAdministrator: boolean
}