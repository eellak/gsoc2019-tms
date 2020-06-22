

export class External {

    //_id: mongoose.Schema.Types.ObjectId,
    public email: string; 
    public name: string;
    public password: string;
    public lastname: string;
    public role: 'External' | 'External-Professor';
    //public university: { type: mongoose.Schema.Types.ObjectId, ref: 'University'},
    
     constructor(email) { this.email=email };

    }
