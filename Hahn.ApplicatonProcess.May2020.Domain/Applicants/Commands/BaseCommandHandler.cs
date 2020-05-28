using Hahn.ApplicatonProcess.May2020.Data.Dtos;
using Hahn.ApplicatonProcess.May2020.Domain.Countries.Queries;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands
{
    public class BaseCommandHandler
    {
        private readonly IMediator _mediator;

        public BaseCommandHandler(IMediator mediator)
        {
            this._mediator = mediator;
        }
        protected async Task ValidateApplicatint(ApplicantDto applicantDto)
        {
            var countryList = await _mediator.Send(new GetAllCountriesQuery());

            var matches = countryList.Where(p => String.Equals(p.Name.Trim().ToLower(), applicantDto.CountryOfOrigin.Trim().ToLower(), StringComparison.CurrentCulture));

            if (matches.Count() == 0)
            {
                throw new Exception($"Country of origin - {applicantDto.CountryOfOrigin} is not a valid country. Please provide a valid one");
            }
        }
    }
}
