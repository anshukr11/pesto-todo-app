export const sortTasks = (tasks: any) => {
    return tasks.sort((a: any, b: any) => {
        const createdAtA = a?.createdAt?.getTime();
        const createdAtB = b?.createdAt?.getTime();
      
        if (createdAtA && createdAtB) {
          return createdAtB - createdAtA;
        } else if (createdAtA) {
          return -1;
        } else if (createdAtB) {
          return 1; 
        } else {
          return 0;
        }
      });
}