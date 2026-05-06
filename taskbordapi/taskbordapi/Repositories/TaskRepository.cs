using Microsoft.EntityFrameworkCore;
using TaskBoardAPI.Data;
using taskbordapi.Models;
using taskbordapi.Models.TaskBoardAPI.Models;

namespace TaskBoardAPI.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskItem>> GetAll()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TaskItem> GetById(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<TaskItem> Create(TaskItem task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<TaskItem> Update(TaskItem task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> Delete(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}