using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.DeleteApplicant
{
    public class DeleteApplicantCommandHandler : IRequestHandler<DeleteApplicantCommand>
    {
        public DeleteApplicantCommandHandler()
        {
        }

        public Task<Unit> Handle(DeleteApplicantCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
