

export class User {

    //_id: mongoose.Schema.Types.ObjectId,
    public email: string; 
    public id: string;
    public name: string;
    public lastname: string;
    public role: 'Guest' | 'Admin' | 'Professor' | 'Student' | 'Secretariat';
    public token : string;
    //public university: { type: mongoose.Schema.Types.ObjectId, ref: 'University'},
    
}