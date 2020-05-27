using Hahn.ApplicatonProcess.May2020.Data.EntityFramework;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.DeleteApplicant
{
    public class DeleteApplicantCommandHandler : IRequestHandler<DeleteApplicantCommand, ApplicantVM>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<DeleteApplicantCommandHandler> _logger;

        public DeleteApplicantCommandHandler(ApplicationDbContext dbContext, ILogger<DeleteApplicantCommandHandler> logger)
        {
            this._dbContext = dbContext;
            this._logger = logger;
        }

        public async Task<ApplicantVM> Handle(DeleteApplicantCommand request, CancellationToken cancellationToken)
        {
            var response = new ApplicantVM
            {
                Status = false,
                Message = "error"
            };

            try
            {
                var entity = await _dbContext.Applicants.FindAsync(request.Id);
                entity.MarkAsDeleted();

                await _dbContext.SaveChangesAsync();

                _logger.LogInformation($"Applicant id {request.Id} deleted successfully.");

                response.Status = true;
                response.Message = "entity deleted successfully.";
                response.Id = entity.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());

                response.Message = ex.Message;
            }

            return response;
        }
    }
}
