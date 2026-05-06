namespace taskbordapi.Models
{
    using System.ComponentModel.DataAnnotations;

    namespace TaskBoardAPI.Models
    {
        public class TaskItem
        {
            public int Id { get; set; }

            [Required]
            [MaxLength(200)]
            public string Title { get; set; }

            [MaxLength(500)]
            public string? Description { get; set; }

            [Required]
            public string Priority { get; set; }  // LOW, MEDIUM, HIGH

            public string? Assignee { get; set; }

            public DateTime? DueDate { get; set; }

            [Required]
            public string Status { get; set; } // todo, inProgress, inReview, done

            public DateTime CreatedAt { get; set; } = DateTime.Now;

            public DateTime? UpdatedAt { get; set; }
        }
    }
}
