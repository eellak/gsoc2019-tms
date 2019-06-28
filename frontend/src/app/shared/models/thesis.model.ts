

export class Thesis {

    //_id: mongoose.Schema.Types.ObjectId,
    public title: String; 
    public description: String;
    public prerequisites: String;
    public tags: [String];
    public created_time: Date;
    
}