export class UserModel{
    constructor(
        public id: string,
        public full_name: string,
        public username: string,
        public password?: string,
    ){}

    static fromJson(obj: any){
        return new UserModel(
            obj['_id'],
            obj['full_name'],
            obj['username'],
        );
    }

    public toJson(user: UserModel){
        return {
            id: user.id,
            full_name: user.full_name,
            username: user.username,
            password: user.password,
        }
    }
}