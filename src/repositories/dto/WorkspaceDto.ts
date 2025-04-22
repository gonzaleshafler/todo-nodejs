export class WorkspaceDto {

  id: number;
  title: string;
  
  constructor(workspace: any) {
    this.id = workspace.id;
    this.title = workspace.title;
  }
}