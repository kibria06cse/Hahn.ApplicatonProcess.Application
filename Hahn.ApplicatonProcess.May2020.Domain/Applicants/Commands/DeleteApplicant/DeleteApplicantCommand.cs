using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.DeleteApplicant
{
    public class DeleteApplicantCommand: IRequest<ApplicantVM>
    {
        public int Id { get; set; }
    }
}
